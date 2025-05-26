import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface QuickInsertPromptsProps {
  selectedModel: string;
  onPromptSelect: (prompt: string) => void;
}

const modelPrompts: Record<string, string[]> = {
  "Sea Ray Sundancer": [
    "Engine overheating fix",
    "Steering system troubleshooting",
    "Electrical system diagnosis",
    "Bilge pump replacement",
    "Fuel system maintenance"
  ],
  "Bayliner Element": [
    "Battery replacement guide",
    "Steering cable adjustment",
    "Engine troubleshooting",
    "Hull maintenance tips"
  ],
  "Grady-White Freedom": [
    "Outboard mounting issues",
    "Hull stress crack repair",
    "Navigation system setup"
  ],
  "Boston Whaler Outrage": [
    "Engine noise diagnosis",
    "Navigation system sync",
    "Battery maintenance"
  ],
  "Other/Generic": [
    "Engine won't start",
    "Battery charging problems",
    "Steering system issues",
    "Electrical system troubleshooting"
  ]
};

export const QuickInsertPrompts = ({ selectedModel, onPromptSelect }: QuickInsertPromptsProps) => {
  const prompts = modelPrompts[selectedModel] || modelPrompts["Other/Generic"];

  if (!selectedModel || selectedModel === "") return null;

  return (
    <div className="mb-3">
      <p className="text-sm text-slate-600 mb-2">📋 Common {selectedModel} issues:</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-7 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
            onClick={() => onPromptSelect(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};
