interface ToolsSuggestionProps {
  content: string;
}

const toolMappings: Record<string, string[]> = {
  "engine": ["socket set", "wrench set", "multimeter"],
  "propeller": ["propeller wrench", "torque wrench"],
  "steering": ["steering cable tool", "adjustable wrench"],
  "electrical": ["multimeter", "wire strippers", "crimping tool"],
  "hull": ["fiberglass repair kit", "marine sealant"],
  "fuel system": ["fuel line disconnect tool", "pressure gauge"],
  "bilge pump": ["screwdriver set", "pliers"],
  "battery": ["battery terminal cleaner", "multimeter"],
  "outboard": ["outboard service kit", "torque wrench"],
  "navigation": ["screwdriver set", "wire strippers"],
  "plumbing": ["pipe wrench", "pliers"],
  "canvas": ["sewing kit", "marine thread"]
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
