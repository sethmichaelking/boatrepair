
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BikeModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export const BikeModelSelector = ({ selectedModel, onModelSelect }: BikeModelSelectorProps) => {
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

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Select your e-bike model for personalized advice:
      </label>
      <Select value={selectedModel} onValueChange={onModelSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose your bike model..." />
        </SelectTrigger>
        <SelectContent>
          {bikeModels.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
