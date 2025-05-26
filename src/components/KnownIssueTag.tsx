interface KnownIssueTagProps {
  issue: string;
  model: string;
}

const knownIssues: Record<string, string[]> = {
  "Sea Ray Sundancer": [
    "steering stiffness",
    "engine overheating",
    "electrical system issues",
    "bilge pump failure"
  ],
  "Bayliner Element": [
    "fuel system problems",
    "steering cable wear",
    "battery drainage"
  ],
  "Grady-White Freedom": [
    "outboard mounting issues",
    "hull stress cracks",
    "range decrease"
  ],
  "Boston Whaler Outrage": [
    "engine noise",
    "navigation system sync",
    "battery drain"
  ]
};

export const KnownIssueTag = ({ issue, model }: KnownIssueTagProps) => {
  const modelIssues = knownIssues[model] || [];
  const isKnownIssue = modelIssues.some(knownIssue => 
    issue.toLowerCase().includes(knownIssue.toLowerCase())
  );

  if (!isKnownIssue) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 my-2">
      <span className="text-amber-600">⚠️</span>
      <span className="text-sm text-amber-800">
        <strong>This is a known issue</strong> on this model. Here's what users have tried...
      </span>
    </div>
  );
};
