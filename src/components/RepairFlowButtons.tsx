
import { Check, Repeat, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepairFlowButtonsProps {
  onWorked: () => void;
  onDidntHelp: () => void;
  onSendPhoto: () => void;
}

export const RepairFlowButtons = ({ onWorked, onDidntHelp, onSendPhoto }: RepairFlowButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200">
      <Button
        variant="outline"
        size="sm"
        onClick={onWorked}
        className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
      >
        <Check className="w-4 h-4" />
        That worked!
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onDidntHelp}
        className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <Repeat className="w-4 h-4" />
        Didn't help, show next step
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onSendPhoto}
        className="flex items-center gap-2 text-purple-600 border-purple-200 hover:bg-purple-50"
      >
        <Camera className="w-4 h-4" />
        Want to send photo
      </Button>
    </div>
  );
};
