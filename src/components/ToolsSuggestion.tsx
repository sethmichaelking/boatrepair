
interface ToolsSuggestionProps {
  content: string;
}

const toolMappings: Record<string, string[]> = {
  "crank arm": ["crank puller", "15mm wrench"],
  "rear wheel": ["15mm wrench", "tire levers"],
  "front wheel": ["15mm wrench", "tire levers"],
  "brake pads": ["4mm hex key", "Phillips screwdriver"],
  "chain": ["chain tool", "chain lubricant"],
  "derailleur": ["2mm hex key", "3mm hex key"],
  "handlebar": ["4mm hex key", "5mm hex key"],
  "seat post": ["4mm hex key", "5mm hex key"],
  "pedals": ["15mm pedal wrench"],
  "battery": ["4mm hex key", "Phillips screwdriver"],
  "controller": ["Phillips screwdriver", "2mm hex key"],
  "display": ["Phillips screwdriver", "3mm hex key"]
};

export const ToolsSuggestion = ({ content }: ToolsSuggestionProps) => {
  const suggestedTools = new Set<string>();
  
  Object.entries(toolMappings).forEach(([part, tools]) => {
    if (content.toLowerCase().includes(part)) {
      tools.forEach(tool => suggestedTools.add(tool));
    }
  });

  if (suggestedTools.size === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mt-3">
      <h4 className="font-semibold text-slate-800 text-sm mb-2">🔩 Tools you'll need:</h4>
      <div className="flex flex-wrap gap-2">
        {Array.from(suggestedTools).map((tool, index) => (
          <span
            key={index}
            className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};
