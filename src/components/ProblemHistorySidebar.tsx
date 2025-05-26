
import { useState } from "react";
import { Clock, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProblemHistory {
  id: string;
  title: string;
  timestamp: Date;
  resolved: boolean;
}

interface ProblemHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueTroubleshooting: (problem: string) => void;
}

export const ProblemHistorySidebar = ({ 
  isOpen, 
  onClose, 
  onContinueTroubleshooting 
}: ProblemHistorySidebarProps) => {
  const [problems] = useState<ProblemHistory[]>([
    {
      id: "1",
      title: "Bike won't power on",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      resolved: false
    },
    {
      id: "2", 
      title: "Battery rattling at high speed",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      resolved: true
    },
    {
      id: "3",
      title: "Throttle unresponsive",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      resolved: false
    }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-slate-200 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">🛠️ Issues you've reported</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className={cn(
              "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-slate-50",
              problem.resolved 
                ? "border-green-200 bg-green-50" 
                : "border-slate-200 bg-white"
            )}
            onClick={() => onContinueTroubleshooting(problem.title)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-slate-800 text-sm">
                  {problem.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {problem.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {problem.resolved ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    ✅ Resolved
                  </span>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinueTroubleshooting(problem.title);
                    }}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
