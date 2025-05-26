import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Key, Anchor } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
  currentApiKey?: string;
  selectedModel?: string;
  onModelSelect?: (model: string) => void;
}

export const ApiKeyModal = ({
  isOpen,
  onClose,
  onSubmit,
  currentApiKey,
  selectedModel,
  onModelSelect
}: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState(currentApiKey || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your API key and boat details to get personalized assistance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="boat-details" className="flex items-center gap-2">
                <Anchor className="w-4 h-4" />
                Boat Details
              </Label>
              <Input
                id="boat-details"
                value={selectedModel || ""}
                onChange={(e) => onModelSelect?.(e.target.value)}
                placeholder="e.g. 2020 Sea Ray 320 Sundancer, Twin 350hp Mercruiser"
                className="text-sm"
              />
            </div>
          </div>

          <Alert>
            <AlertDescription>
              Don't have an API key?{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Get one from OpenAI
                <ExternalLink className="w-3 h-3" />
              </a>
            </AlertDescription>
          </Alert>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!apiKey.trim()}>
              Save Settings
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
