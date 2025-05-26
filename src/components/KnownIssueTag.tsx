
interface KnownIssueTagProps {
  issue: string;
  model: string;
}

const knownIssues: Record<string, string[]> = {
  "Macfox X2": [
    "throttle delay",
    "battery rattling",
    "controller overheating",
    "display flickering"
  ],
  "Rad Power RadCity": [
    "brake squeal",
    "motor cutting out",
    "battery not charging"
  ],
  "Trek Verve+": [
    "bosch error 500",
    "chain skipping",
    "range decrease"
  ],
  "Specialized Turbo Vado": [
    "motor noise",
    "mission control sync",
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
