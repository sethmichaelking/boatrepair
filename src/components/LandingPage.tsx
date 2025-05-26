
import { Zap, Camera, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BikeModelSelector } from "./BikeModelSelector";
import { ErrorCodeLookup } from "./ErrorCodeLookup";

interface LandingPageProps {
  onExampleClick: (text: string) => void;
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export const LandingPage = ({ onExampleClick, selectedModel, onModelSelect }: LandingPageProps) => {
  const examples = [
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Photo Diagnosis",
      description: "Upload a photo of your bike issue",
      prompt: "I'd like to upload a photo of my bike issue for diagnosis"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Battery Issues",
      description: "Battery not charging or losing power quickly",
      prompt: "My battery isn't charging properly and seems to lose power quickly. Can you help me troubleshoot?"
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Motor Problems",
      description: "Strange noises or performance issues",
      prompt: "My motor is making unusual noises and the performance seems reduced. What could be wrong?"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "General Maintenance",
      description: "Regular maintenance and care tips",
      prompt: "Can you give me a maintenance schedule and tips for keeping my electric bike in good condition?"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome to BikeBot
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl">
          Your AI-powered electric bike maintenance and repair assistant. Get expert help with diagnostics, troubleshooting, and maintenance guidance.
        </p>
      </div>

      <div className="w-full max-w-2xl mb-8">
        <BikeModelSelector 
          selectedModel={selectedModel}
          onModelSelect={onModelSelect}
        />
      </div>

      <div className="w-full max-w-2xl mb-8">
        <ErrorCodeLookup onSendToChat={onExampleClick} />
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
          How can I help you today?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {examples.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-6 text-left flex flex-col items-start gap-3 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              onClick={() => onExampleClick(example.prompt)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {example.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">
                    {example.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {example.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Choose an option above or start typing your question below
          </p>
        </div>
      </div>
    </div>
  );
};
