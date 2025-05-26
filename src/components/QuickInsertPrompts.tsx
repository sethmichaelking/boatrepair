
import { Button } from "@/components/ui/button";

interface QuickInsertPromptsProps {
  selectedModel: string;
  onPromptSelect: (prompt: string) => void;
}

const modelPrompts: Record<string, string[]> = {
  "Macfox X2": [
    "Macfox battery rattling fix",
    "Macfox error codes",
    "Macfox controller replacement steps",
    "Macfox display not working",
    "Macfox charging issues"
  ],
  "Rad Power RadCity": [
    "RadCity battery removal guide",
    "RadCity brake adjustment",
    "RadCity motor troubleshooting",
    "RadCity tire pressure specs"
  ],
  "Trek Verve+": [
    "Trek Verve+ Bosch system errors",
    "Trek Verve+ chain maintenance",
    "Trek Verve+ gear shifting issues"
  ],
  "Specialized Turbo Vado": [
    "Turbo Vado motor noise",
    "Turbo Vado battery calibration",
    "Turbo Vado Mission Control app issues"
  ],
  "Other/Generic": [
    "E-bike won't turn on",
    "Battery charging problems",
    "Motor cutting out randomly",
    "Display showing error codes"
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
