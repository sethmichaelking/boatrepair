import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BoatModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export const BoatModelSelector = ({ selectedModel, onModelSelect }: BoatModelSelectorProps) => {
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
    <div className="w-full max-w-md mx-auto mb-8">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Select your boat model for personalized advice:
      </label>
      <Select value={selectedModel} onValueChange={onModelSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose your boat model..." />
        </SelectTrigger>
        <SelectContent>
          {boatModels.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
