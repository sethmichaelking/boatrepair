import { Camera, Anchor, Wrench, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface LandingPageProps {
  onExampleClick: (text: string) => void;
}

export const LandingPage = ({ onExampleClick }: LandingPageProps) => {
  const examples = [
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Photo Diagnosis",
      description: "Upload a photo of your boat issue",
      prompt: "I'd like to upload a photo of my boat issue for diagnosis"
    },
    {
      icon: <Anchor className="w-5 h-5" />,
      title: "Engine Issues",
      description: "Engine not starting or running poorly",
      prompt: "My engine isn't starting properly and seems to run rough. Can you help me troubleshoot?"
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Mechanical Problems",
      description: "Steering, electrical, or hull issues",
      prompt: "My steering feels loose and there are some electrical issues. What could be wrong?"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "General Maintenance",
      description: "Regular maintenance and care tips",
      prompt: "Can you give me a maintenance schedule and tips for keeping my boat in good condition?"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <Anchor className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Welcome to BoatBot
        </h1>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl">
          Your AI-powered boat maintenance and repair assistant. Get expert help with diagnostics, troubleshooting, and maintenance guidance.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          How can I help you today?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {examples.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 text-left flex flex-col items-start gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              onClick={() => onExampleClick(example.prompt)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {example.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-0.5">
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
