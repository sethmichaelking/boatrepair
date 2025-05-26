
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
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Error Code & Symptom Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-3">
          <Input
            placeholder="Enter error code (e.g. E07) or symptom (e.g. motor whines)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} size="sm" className="px-4">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <div className="space-y-4 p-5 bg-slate-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-800 text-base">{result.issue}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                {result.difficulty}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Wrench className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-sm text-slate-700">Solution:</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.fix}</p>
                </div>
              </div>

              {result.partsNeeded && (
                <div className="flex items-start gap-3">
                  <Package className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-slate-700">Parts Needed:</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {result.partsNeeded.map((part, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                          {part}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {result.caution && (
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-yellow-800">Caution:</p>
                    <p className="text-sm text-yellow-700 leading-relaxed">{result.caution}</p>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={handleSendToChat}
              variant="outline"
              size="sm"
              className="w-full mt-4"
            >
              Get More Help in Chat
            </Button>
          </div>
        )}

        {searchQuery && !result && searchQuery.length > 0 && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 leading-relaxed">
              No results found for "{searchQuery}". Try a common error code or symptom.
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-600 mb-2">Common error codes:</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            E01 (Hall sensor) • E02 (Temperature) • E03 (Short circuit) • E07 (Overload) • E08 (Battery)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
