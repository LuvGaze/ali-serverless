import { FC } from 'react';
import { MessageSquare, Lightbulb, Code, HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  onSendMessage: (message: string) => void;
}

const suggestions = [
  {
    icon: MessageSquare,
    title: "Explain quantum computing",
    subtitle: "in simple terms"
  },
  {
    icon: Code,
    title: "Write a Python function",
    subtitle: "to reverse a string"
  },
  {
    icon: Lightbulb,
    title: "Give me ideas for",
    subtitle: "a weekend project"
  },
  {
    icon: HelpCircle,
    title: "How do I center a div",
    subtitle: "in CSS?"
  }
];

export const EmptyState: FC<EmptyStateProps> = ({ onSendMessage }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
          <MessageSquare size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-chat-text mb-2">
          How can I help you today?
        </h1>
        <p className="text-chat-text-secondary">
          Ask me anything - I'm here to help with questions, creative tasks, coding, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <button
              key={index}
              onClick={() => onSendMessage(`${suggestion.title} ${suggestion.subtitle}`)}
              className="p-4 rounded-lg border border-chat-border/20 bg-chat-input/50 hover:bg-chat-input transition-colors text-left group"
            >
              <div className="flex items-start gap-3">
                <Icon size={20} className="text-chat-text-secondary mt-0.5 group-hover:text-chat-text transition-colors" />
                <div>
                  <div className="text-chat-text font-medium">
                    {suggestion.title}
                  </div>
                  <div className="text-chat-text-secondary text-sm">
                    {suggestion.subtitle}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
