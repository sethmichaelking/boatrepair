import { useState, useEffect } from "react";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import { LandingPage } from "@/components/LandingPage";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Message } from "@/types/chat";

interface Conversation {
  id: string;
  messages: Message[];
  timestamp: Date;
  title: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm BoatBot, your AI assistant for boat maintenance and repairs. Upload a photo of your boat issue or ask me any questions about boat maintenance, troubleshooting, or repairs. I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBoatModel, setSelectedBoatModel] = useState<string>("");

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem("boatbot_conversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("boatbot_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  // Check for boat model in localStorage on component mount
  useEffect(() => {
    const savedBoatModel = localStorage.getItem("selected_boat_model");
    if (savedBoatModel) {
      setSelectedBoatModel(savedBoatModel);
    }
  }, []);

  // Check if user has sent any messages (excluding the welcome message)
  const userMessages = messages.filter(msg => msg.role === "user");
  const showLandingPage = userMessages.length === 0;

  const handleSendMessage = async (content: string, imageFile?: File) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OpenAI API key not found in environment variables");
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
          model: "gpt-4",
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
        content: "Sorry, I encountered an error while processing your request. Please try again.",
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
    setSelectedBoatModel(model);
    localStorage.setItem("selected_boat_model", model);
  };

  const handleRepairFlowAction = (action: 'worked' | 'didnt-help' | 'send-photo') => {
    switch (action) {
      case 'worked':
        handleSendMessage("✅ That solution worked! Thank you for the help.");
        break;
      case 'didnt-help':
        handleSendMessage("🔁 That didn't help. Can you show me the next step or suggest an alternative solution?");
        break;
      case 'send-photo': {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.click();
        }
        break;
      }
    }
  };

  const handleContinueTroubleshooting = (problem: string) => {
    handleSendMessage(`🔁 Continue troubleshooting: ${problem}`);
  };

  const handleNewChat = () => {
    // Save current conversation if it has user messages
    if (messages.length > 1) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        messages: [...messages],
        timestamp: new Date(),
        title: messages[1].content.slice(0, 50) + (messages[1].content.length > 50 ? "..." : ""),
      };

      setConversations(prev => {
        const updated = [newConversation, ...prev].slice(0, 10); // Keep only last 10 conversations
        return updated;
      });
    }

    // Reset to welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm BoatBot, your AI assistant for boat maintenance and repairs. Upload a photo of your boat issue or ask me any questions about boat maintenance, troubleshooting, or repairs. I'm here to help!",
        timestamp: new Date(),
      },
    ]);
    setCurrentConversationId("");
  };

  const handleLoadConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setMessages(conversation.messages);
      setCurrentConversationId(conversationId);
    }
  };

  const handleClearHistory = () => {
    setConversations([]);
    localStorage.removeItem("boatbot_conversations");
  };

  const buildMessages = async (messageHistory: Message[]) => {
    let systemContent = `You are BoatBot, an expert AI assistant specializing in boat maintenance, repairs, and troubleshooting. You help users diagnose problems, suggest solutions, and provide maintenance advice.

FORMATTING GUIDELINES - Always format your responses for easy scanning:
• Use clear headings with **bold text**
• Break information into numbered lists or bullet points
• Use short paragraphs (2-3 sentences max)
• Highlight key terms with **bold**
• Use line breaks between sections
• Structure troubleshooting steps clearly
• Make solutions actionable and specific

When users share images, analyze them carefully for any visible issues, wear patterns, or problems. Always provide practical, safety-focused advice and suggest when professional help might be needed for complex mechanical or electrical issues.`;

    if (selectedBoatModel && selectedBoatModel !== "Other/Generic") {
      systemContent += ` The user has a **${selectedBoatModel}** boat. Please provide model-specific advice when relevant, including known issues, specific maintenance requirements, and compatibility considerations for this model.`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar
            onSettingsClick={() => {}}
            selectedModel={selectedBoatModel}
            onModelSelect={handleModelSelect}
            onContinueTroubleshooting={handleContinueTroubleshooting}
            onNewChat={handleNewChat}
            conversations={conversations}
            onLoadConversation={handleLoadConversation}
            onClearHistory={handleClearHistory}
            currentConversationId={currentConversationId}
          />

          <SidebarInset className="flex flex-col">
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-4">
              {showLandingPage ? (
                <div className="flex-1 flex flex-col -mt-2">
                  <LandingPage
                    onExampleClick={handleExampleClick}
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <ChatMessages
                    messages={messages}
                    isLoading={isLoading}
                    onRepairFlowAction={handleRepairFlowAction}
                    selectedModel={selectedBoatModel}
                  />
                </div>
              )}
              <div className="mt-3 pb-6">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                  selectedModel={selectedBoatModel}
                  onModelSelect={handleModelSelect}
                />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
