
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Wrench, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorCodeResult {
  code: string;
  issue: string;
  fix: string;
  partsNeeded?: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  caution?: string;
}

const errorCodeDatabase: Record<string, ErrorCodeResult> = {
  'E01': {
    code: 'E01',
    issue: 'Hall sensor error',
    fix: 'Check motor hall sensor connections. Clean connectors and ensure proper seating.',
    partsNeeded: ['Hall sensor cable', 'Electrical contact cleaner'],
    difficulty: 'Medium',
    caution: 'Disconnect battery before working on electrical connections'
  },
  'E02': {
    code: 'E02',
    issue: 'Motor temperature sensor error',
    fix: 'Allow motor to cool down. Check temperature sensor wiring.',
    difficulty: 'Easy'
  },
  'E03': {
    code: 'E03',
    issue: 'Motor hall sensor short circuit',
    fix: 'Replace motor hall sensor cable. Check for damaged wiring.',
    partsNeeded: ['Hall sensor replacement kit'],
    difficulty: 'Hard',
    caution: 'Professional installation recommended'
  },
  'E07': {
    code: 'E07',
    issue: 'Motor controller overload',
    fix: 'Check controller wiring and throttle tension. Reduce load on motor.',
    partsNeeded: ['Motor controller (if damaged)'],
    difficulty: 'Medium',
    caution: 'May indicate controller failure - test before replacing'
  },
  'E08': {
    code: 'E08',
    issue: 'Battery communication error',
    fix: 'Check battery connection to controller. Clean battery terminals.',
    partsNeeded: ['Battery terminal cleaner', 'Connection cable'],
    difficulty: 'Easy'
  }
};

const symptomDatabase: Record<string, ErrorCodeResult> = {
  'motor whines': {
    code: 'SYMPTOM',
    issue: 'Motor bearing wear or misalignment',
    fix: 'Inspect motor bearings. Check wheel alignment and spoke tension.',
    partsNeeded: ['Motor bearings', 'Spoke tension meter'],
    difficulty: 'Hard',
    caution: 'Motor disassembly required - consider professional service'
  },
  'battery not charging': {
    code: 'SYMPTOM',
    issue: 'Charger or battery management system issue',
    fix: 'Test charger output voltage. Check battery fuse and BMS connections.',
    partsNeeded: ['Multimeter', 'Replacement fuse', 'BMS unit (if faulty)'],
    difficulty: 'Medium'
  },
  'display not working': {
    code: 'SYMPTOM',
    issue: 'Display connection or power issue',
    fix: 'Check display cable connections. Verify power supply to display unit.',
    partsNeeded: ['Display cable', 'Display unit'],
    difficulty: 'Easy'
  }
};

interface ErrorCodeLookupProps {
  onSendToChat: (message: string) => void;
}

export const ErrorCodeLookup = ({ onSendToChat }: ErrorCodeLookupProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<ErrorCodeResult | null>(null);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    
    // First check error codes
    const errorResult = errorCodeDatabase[query.toUpperCase()];
    if (errorResult) {
      setResult(errorResult);
      return;
    }

    // Then check symptoms
    const symptomResult = symptomDatabase[query];
    if (symptomResult) {
      setResult(symptomResult);
      return;
    }

    // No match found
    setResult(null);
  };

  const handleSendToChat = () => {
    if (result) {
      const message = `I'm experiencing: ${result.issue}. Error code: ${result.code}. Can you help me with this?`;
      onSendToChat(message);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Error Code & Symptom Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter error code (e.g. E07) or symptom (e.g. motor whines)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} size="sm">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-800">{result.issue}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                {result.difficulty}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-slate-700">Fix:</p>
                  <p className="text-sm text-slate-600">{result.fix}</p>
                </div>
              </div>

              {result.partsNeeded && (
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-slate-700">Parts Needed:</p>
                    <ul className="text-sm text-slate-600">
                      {result.partsNeeded.map((part, index) => (
                        <li key={index}>• {part}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {result.caution && (
                <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-yellow-800">Caution:</p>
                    <p className="text-sm text-yellow-700">{result.caution}</p>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={handleSendToChat}
              variant="outline"
              size="sm"
              className="w-full mt-3"
            >
              Send to Chat for More Help
            </Button>
          </div>
        )}

        {searchQuery && !result && searchQuery.length > 0 && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">
              No results found for "{searchQuery}". Try entering a common error code (E01-E08) or symptom like "motor whines" or "battery not charging".
            </p>
          </div>
        )}

        <div className="text-xs text-slate-500">
          <p className="font-medium mb-1">Common error codes:</p>
          <p>E01 (Hall sensor), E02 (Temperature), E03 (Short circuit), E07 (Overload), E08 (Battery)</p>
        </div>
      </CardContent>
    </Card>
  );
};
