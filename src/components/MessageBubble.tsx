
import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { RepairFlowButtons } from "./RepairFlowButtons";

interface MessageBubbleProps {
  message: Message;
  onRepairFlowAction?: (action: 'worked' | 'didnt-help' | 'send-photo') => void;
}

const renderMarkdown = (text: string) => {
  // Process the text to handle markdown patterns
  let processedText = text;
  const elements: JSX.Element[] = [];
  let currentIndex = 0;
  
  // Split by line breaks first to handle them properly
  const lines = processedText.split('\n');
  
  return lines.map((line, lineIndex) => {
    const lineElements: (string | JSX.Element)[] = [];
    let remaining = line;
    let elementIndex = 0;
    
    // Handle headers first
    if (remaining.startsWith('### ')) {
      return (
        <div key={`line-${lineIndex}`}>
          <h3 className="font-bold text-lg mt-4 mb-2 first:mt-0">
            {remaining.slice(4)}
          </h3>
        </div>
      );
    }
    
    // Handle bold text
    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      
      if (boldMatch && boldMatch.index !== undefined) {
        // Add text before the bold part
        if (boldMatch.index > 0) {
          lineElements.push(remaining.slice(0, boldMatch.index));
        }
        
        // Add the bold part
        lineElements.push(
          <strong key={`bold-${lineIndex}-${elementIndex}`} className="font-semibold">
            {boldMatch[1]}
          </strong>
        );
        
        // Move to the text after the bold part
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
        elementIndex++;
      } else {
        // No more bold text, add the remaining text
        if (remaining.length > 0) {
          lineElements.push(remaining);
        }
        break;
      }
    }
    
    return (
      <div key={`line-${lineIndex}`}>
        {lineElements.length > 0 ? lineElements : line}
        {lineIndex < lines.length - 1 && <br />}
      </div>
    );
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
