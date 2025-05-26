
import { Settings, Zap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChatHeaderProps {
  onSettingsClick: () => void;
  selectedModel?: string;
  onModelSelect?: (model: string) => void;
}

export const ChatHeader = ({ onSettingsClick, selectedModel, onModelSelect }: ChatHeaderProps) => {
  const bikeModels = [
    "Macfox X2",
    "Rad Power RadCity",
    "Trek Verve+",
    "Specialized Turbo Vado",
    "Cannondale Quick Neo",
    "Giant Quick-E+",
    "Yamaha CrossCore",
    "Bosch Performance Line",
    "Bafang Mid-Drive",
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
            <h1 className="text-xl font-bold text-slate-800">BikeBot</h1>
            <p className="text-sm text-slate-600">Electric Bike AI Assistant</p>
          </div>
        </div>

        {selectedModel && (
          <div className="flex items-center gap-3 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <Wrench className="w-4 h-4 text-blue-600" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-800">Working on:</span>
              {onModelSelect ? (
                <Select value={selectedModel} onValueChange={onModelSelect}>
                  <SelectTrigger className="h-8 min-w-[140px] border-blue-300 bg-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bikeModels.map((model) => (
                      <SelectItem key={model} value={model} className="text-sm">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-sm font-semibold text-blue-900">{selectedModel}</span>
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
    </header>
  );
};
