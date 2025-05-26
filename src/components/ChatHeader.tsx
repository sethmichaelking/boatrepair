
import { Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onSettingsClick: () => void;
}

export const ChatHeader = ({ onSettingsClick }: ChatHeaderProps) => {
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
