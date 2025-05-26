import { useState } from "react";
import { Settings, Anchor, Wrench, Clock, RotateCcw, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
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
import { Message } from "@/types/chat";

interface Conversation {
  id: string;
  messages: Message[];
  timestamp: Date;
  title: string;
}

interface AppSidebarProps {
  onSettingsClick: () => void;
  selectedModel?: string;
  onModelSelect?: (model: string) => void;
  onContinueTroubleshooting: (problem: string) => void;
  onNewChat: () => void;
  conversations: Conversation[];
  onLoadConversation: (conversationId: string) => void;
  onClearHistory: () => void;
  currentConversationId: string;
}

export function AppSidebar({
  onSettingsClick,
  selectedModel,
  onModelSelect,
  onContinueTroubleshooting,
  onNewChat,
  conversations,
  onLoadConversation,
  onClearHistory,
  currentConversationId
}: AppSidebarProps) {
  return (
    <Sidebar className="w-80 border-r border-slate-200">
      <SidebarHeader className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">BoatBot</h1>
            <p className="text-sm text-slate-600">Boat Repair AI Assistant</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onNewChat}
            className="flex-1 justify-start text-slate-600 hover:text-slate-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="text-slate-600 hover:text-slate-800"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {selectedModel && (
          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200 mt-4">
            <Wrench className="w-4 h-4 text-blue-600" />
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium text-blue-800">Working on:</span>
              {onModelSelect ? (
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Boat Details
                  </label>
                  <Input
                    value={selectedModel}
                    onChange={(e) => onModelSelect(e.target.value)}
                    placeholder="e.g. 2020 Sea Ray 320 Sundancer, Twin 350hp Mercruiser"
                    className="h-8 flex-1 border-blue-300 bg-white text-sm"
                  />
                </div>
              ) : (
                <span className="text-sm font-semibold text-blue-900">{selectedModel}</span>
              )}
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Conversations
            </div>
            {conversations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                className="h-6 px-2 text-slate-500 hover:text-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    className={cn(
                      "flex-col items-start gap-1 h-auto p-3 cursor-pointer",
                      conversation.id === currentConversationId
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-slate-50"
                    )}
                    onClick={() => onLoadConversation(conversation.id)}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 text-sm text-left">
                          {conversation.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {new Date(conversation.timestamp).toLocaleDateString()}
                          </span>
                        </div>
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
