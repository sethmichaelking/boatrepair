import { useState } from "react";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import { LandingPage } from "@/components/LandingPage";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Message } from "@/types/chat";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm BikeBot, your AI assistant for electric bike maintenance and repairs. Upload a photo of your bike issue or ask me any questions about electric bike maintenance, troubleshooting, or repairs. I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedBikeModel, setSelectedBikeModel] = useState<string>("");

  // Check for API key in localStorage on component mount
  useState(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    const savedBikeModel = localStorage.getItem("selected_bike_model");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiModal(true);
    }
    if (savedBikeModel) {
      setSelectedBikeModel(savedBikeModel);
    }
  });

  // Check if user has sent any messages (excluding the welcome message)
  const userMessages = messages.filter(msg => msg.role === "user");
  const showLandingPage = userMessages.length === 0;

  const handleSendMessage = async (content: string, imageFile?: File) => {
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
      imageFile,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: await buildMessages([...messages, userMessage]),
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please check your API key and try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleModelSelect = (model: string) => {
    setSelectedBikeModel(model);
    localStorage.setItem("selected_bike_model", model);
  };

  const handleRepairFlowAction = (action: 'worked' | 'didnt-help' | 'send-photo') => {
    switch (action) {
      case 'worked':
        handleSendMessage("✅ That solution worked! Thank you for the help.");
        break;
      case 'didnt-help':
        handleSendMessage("🔁 That didn't help. Can you show me the next step or suggest an alternative solution?");
        break;
      case 'send-photo':
        // This will trigger the file input in ChatInput
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.click();
        }
        break;
    }
  };

  const handleContinueTroubleshooting = (problem: string) => {
    handleSendMessage(`🔁 Continue troubleshooting: ${problem}`);
  };

  const buildMessages = async (messageHistory: Message[]) => {
    let systemContent = `You are BikeBot, an expert AI assistant specializing in electric bike maintenance, repairs, and troubleshooting. You help users diagnose problems, suggest solutions, and provide maintenance advice. 

FORMATTING GUIDELINES - Always format your responses for easy scanning:
• Use clear headings with **bold text**
• Break information into numbered lists or bullet points
• Use short paragraphs (2-3 sentences max)
• Highlight key terms with **bold**
• Use line breaks between sections
• Structure troubleshooting steps clearly
• Make solutions actionable and specific

When users share images, analyze them carefully for any visible issues, wear patterns, or problems. Always provide practical, safety-focused advice and suggest when professional help might be needed for complex electrical or mechanical issues.`;
    
    if (selectedBikeModel && selectedBikeModel !== "Other/Generic") {
      systemContent += ` The user has a **${selectedBikeModel}** electric bike. Please provide model-specific advice when relevant, including known issues, specific maintenance requirements, and compatibility considerations for this model.`;
    }

    const systemMessage = {
      role: "system",
      content: systemContent
    };

    const chatMessages = await Promise.all(
      messageHistory.slice(1).map(async (msg) => {
        if (msg.imageFile) {
          const base64Image = await fileToBase64(msg.imageFile);
          return {
            role: msg.role,
            content: [
              {
                type: "text",
                text: msg.content,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${msg.imageFile.type};base64,${base64Image}`,
                },
              },
            ],
          };
        } else {
          return {
            role: msg.role,
            content: msg.content,
          };
        }
      })
    );

    return [systemMessage, ...chatMessages];
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
    setShowApiModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar
            onSettingsClick={() => setShowApiModal(true)}
            selectedModel={selectedBikeModel}
            onModelSelect={handleModelSelect}
            onContinueTroubleshooting={handleContinueTroubleshooting}
          />
          
          <SidebarInset className="flex flex-col">
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pb-4">
              {showLandingPage ? (
                <LandingPage 
                  onExampleClick={handleExampleClick}
                />
              ) : (
                <ChatMessages 
                  messages={messages} 
                  isLoading={isLoading} 
                  onRepairFlowAction={handleRepairFlowAction}
                  selectedModel={selectedBikeModel}
                />
              )}
              <ChatInput 
                onSendMessage={handleSendMessage} 
                disabled={isLoading}
                selectedModel={selectedBikeModel}
                onModelSelect={handleModelSelect}
              />
            </div>
          </SidebarInset>
        </div>

        <ApiKeyModal
          isOpen={showApiModal}
          onClose={() => setShowApiModal(false)}
          onSubmit={handleApiKeySubmit}
          currentApiKey={apiKey}
        />
      </SidebarProvider>
    </div>
  );
};

export default Index;
