import { Settings, Zap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChatHeaderProps {
  onSettingsClick: () => void;
  selectedModel?: string;
  onModelSelect?: (model: string) => void;
}

export const ChatHeader = ({ onSettingsClick, selectedModel, onModelSelect }: ChatHeaderProps) => {
  const boatModels = [
    "Sea Ray Sundancer",
    "Bayliner Element",
    "Grady-White Freedom",
    "Boston Whaler Outrage",
    "Regal Express Cruiser",
    "Formula 280 SS",
    "Cobalt R5",
    "Yamaha 242X",
    "Mercury Verado",
    "Other/Generic"
  ];

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">BoatBot</h1>
            <p className="text-sm text-slate-600">Boat Repair AI Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {selectedModel && (
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200">
              <Wrench className="w-4 h-4 text-blue-600" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-800 whitespace-nowrap">Working on:</span>
                {onModelSelect ? (
                  <Select value={selectedModel} onValueChange={onModelSelect}>
                    <SelectTrigger className="h-8 min-w-[160px] border-blue-300 bg-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {boatModels.map((model) => (
                        <SelectItem key={model} value={model} className="text-sm">
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm font-semibold text-blue-900 whitespace-nowrap">{selectedModel}</span>
                )}
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="text-slate-600 hover:text-slate-800"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
