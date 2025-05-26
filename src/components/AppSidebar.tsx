import { useState } from "react";
import { Settings, Zap, Wrench, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface ProblemHistory {
  id: string;
  title: string;
  timestamp: Date;
  resolved: boolean;
}

interface AppSidebarProps {
  onSettingsClick: () => void;
  selectedModel?: string;
  onModelSelect?: (model: string) => void;
  onContinueTroubleshooting: (problem: string) => void;
}

export function AppSidebar({ 
  onSettingsClick, 
  selectedModel, 
  onModelSelect, 
  onContinueTroubleshooting 
}: AppSidebarProps) {
  const [problems] = useState<ProblemHistory[]>([
    {
      id: "1",
      title: "Engine won't start",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      resolved: false
    },
    {
      id: "2", 
      title: "Battery not holding charge",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      resolved: true
    },
    {
      id: "3",
      title: "Steering system issues",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      resolved: false
    }
  ]);

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
    <Sidebar className="w-80 border-r border-slate-200">
      <SidebarHeader className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">BoatBot</h1>
            <p className="text-sm text-slate-600">Boat Repair AI Assistant</p>
          </div>
        </div>

        {selectedModel && (
          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200">
            <Wrench className="w-4 h-4 text-blue-600" />
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium text-blue-800">Working on:</span>
              {onModelSelect ? (
                <Select value={selectedModel} onValueChange={onModelSelect}>
                  <SelectTrigger className="h-8 flex-1 border-blue-300 bg-white text-sm">
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
                <span className="text-sm font-semibold text-blue-900">{selectedModel}</span>
              )}
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="mt-2 justify-start text-slate-600 hover:text-slate-800"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Issues you've reported
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {problems.map((problem) => (
                <SidebarMenuItem key={problem.id}>
                  <SidebarMenuButton
                    className={cn(
                      "flex-col items-start gap-1 h-auto p-3 cursor-pointer",
                      problem.resolved 
                        ? "bg-green-50 border border-green-200" 
                        : "hover:bg-slate-50"
                    )}
                    onClick={() => onContinueTroubleshooting(problem.title)}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 text-sm text-left">
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
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
