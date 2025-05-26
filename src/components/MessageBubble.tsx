
import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { RepairFlowButtons } from "./RepairFlowButtons";

interface MessageBubbleProps {
  message: Message;
  onRepairFlowAction?: (action: 'worked' | 'didnt-help' | 'send-photo') => void;
}

const renderMarkdown = (text: string) => {
  // Split by markdown patterns while preserving the delimiters
  const parts = text.split(/(\*\*[^*]+\*\*|###\s[^\n]+|\n)/g);
  
  return parts.map((part, index) => {
    // Handle headers (### )
    if (part.startsWith('### ')) {
      return (
        <h3 key={index} className="font-bold text-lg mt-4 mb-2 first:mt-0">
          {part.slice(4)}
        </h3>
      );
    }
    
    // Handle bold text
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    
    // Handle line breaks
    if (part === '\n') {
      return <br key={index} />;
    }
    
    // Regular text
    return part;
  });
};

export const MessageBubble = ({ message, onRepairFlowAction }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const isWelcomeMessage = message.id === "welcome";

  const handleRepairFlowAction = (action: 'worked' | 'didnt-help' | 'send-photo') => {
    if (onRepairFlowAction) {
      onRepairFlowAction(action);
    }
  };

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        isUser 
          ? "bg-blue-500 text-white" 
          : "bg-white border border-slate-200 text-slate-800"
      )}>
        {message.imageFile && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(message.imageFile)}
              alt="Uploaded image"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
        <div className="text-sm leading-relaxed">
          {renderMarkdown(message.content)}
        </div>
        <div className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-blue-100" : "text-slate-500"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>

        {/* Show repair flow buttons for assistant messages (except welcome message) */}
        {!isUser && !isWelcomeMessage && onRepairFlowAction && (
          <RepairFlowButtons
            onWorked={() => handleRepairFlowAction('worked')}
            onDidntHelp={() => handleRepairFlowAction('didnt-help')}
            onSendPhoto={() => handleRepairFlowAction('send-photo')}
          />
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};
