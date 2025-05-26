import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { QuickInsertPrompts } from "./QuickInsertPrompts";

interface ChatInputProps {
  onSendMessage: (content: string, imageFile?: File) => void;
  disabled: boolean;
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export const ChatInput = ({ onSendMessage, disabled, selectedModel, onModelSelect }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) return;

    onSendMessage(message.trim() || "Please analyze this image", selectedImage || undefined);
    setMessage("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 ml-12 mr-6 mb-6">
      {/* Quick Insert Prompts */}
      <QuickInsertPrompts 
        selectedModel={selectedModel} 
        onPromptSelect={handlePromptSelect} 
      />

      {imagePreview && (
        <div className="mb-4 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-32 h-auto rounded-lg border border-slate-200"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
            onClick={removeImage}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-48">
            <Select value={selectedModel} onValueChange={onModelSelect}>
              <SelectTrigger className="h-12 border-slate-200 focus:border-blue-300 focus:ring-blue-300">
                <SelectValue placeholder="Select bike model..." />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                {bikeModels.map((model) => (
                  <SelectItem key={model} value={model} className="hover:bg-slate-50">
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your electric bike or describe the issue..."
              className="w-full h-12 px-3 py-3 text-sm border border-slate-200 rounded-md bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-20 outline-none resize-none overflow-hidden"
              disabled={disabled}
              rows={1}
            />
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="w-12 h-12 p-0 border-slate-200 hover:bg-slate-50"
            >
              <Camera className="w-4 h-4" />
            </Button>
            
            <Button
              type="submit"
              disabled={disabled || (!message.trim() && !selectedImage)}
              className="w-12 h-12 p-0 bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
