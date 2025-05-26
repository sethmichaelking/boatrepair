
import { Wrench, Camera, MessageCircle, Zap } from "lucide-react";

interface LandingPageProps {
  onExampleClick: (text: string) => void;
}

export const LandingPage = ({ onExampleClick }: LandingPageProps) => {
  const examples = [
    "My electric bike won't turn on, what should I check?",
    "How do I maintain my e-bike battery for longer life?",
    "My bike is making strange noises when I pedal",
    "The motor cuts out when going uphill"
  ];

  const capabilities = [
    {
      icon: MessageCircle,
      title: "Diagnostic Help",
      description: "Get step-by-step troubleshooting guidance for common e-bike issues"
    },
    {
      icon: Camera,
      title: "Image Analysis",
      description: "Upload photos of your bike for visual problem identification"
    },
    {
      icon: Wrench,
      title: "Maintenance Tips",
      description: "Learn proper care and maintenance for your electric bike"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">BikeBot</h1>
            <p className="text-xl text-slate-600">Your AI Electric Bike Assistant</p>
          </div>
        </div>

        <p className="text-lg text-slate-700 mb-12 leading-relaxed">
          Get expert help with your electric bike maintenance, troubleshooting, and repairs. 
          Ask questions, upload photos, and receive personalized guidance.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <capability.icon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{capability.title}</h3>
              <p className="text-sm text-slate-600">{capability.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Try asking:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => onExampleClick(example)}
                className="text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors text-sm text-slate-700"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-500">
          Upload photos of bike issues or ask questions to get started
        </div>
      </div>
    </div>
  );
};
