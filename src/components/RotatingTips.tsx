
import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";

const tips = [
  "Many e-bike throttles can be recalibrated using a hidden menu on the controller.",
  "Store your e-bike battery at 50-60% charge for optimal longevity.",
  "Check tire pressure weekly - proper inflation can increase your range by 10-15%.",
  "Clean your chain every 100-200 miles to maintain smooth operation.",
  "Most e-bike displays have diagnostic modes accessible through button combinations.",
  "Keep your battery contacts clean with a dry cloth to prevent connection issues.",
  "Brake pads should be replaced when they're worn down to 1mm thickness."
];

interface RotatingTipsProps {
  isVisible: boolean;
}

export const RotatingTips = ({ isVisible }: RotatingTipsProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000); // Change tip every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
      <div className="flex items-start gap-2">
        <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-sm font-medium text-blue-800">💡 Did you know?</span>
          <p className="text-sm text-blue-700 mt-1">{tips[currentTip]}</p>
        </div>
      </div>
    </div>
  );
};
