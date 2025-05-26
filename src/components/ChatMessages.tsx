
import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  selectedModel?: string;
  onRepairFlowAction?: (action: 'worked' | 'didnt-help' | 'send-photo') => void;
}

export const ChatMessages = ({ messages, isLoading, selectedModel, onRepairFlowAction }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble 
          key={message.id} 
          message={message} 
          selectedModel={selectedModel}
          onRepairFlowAction={onRepairFlowAction}
        />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
