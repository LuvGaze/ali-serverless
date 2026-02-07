import { FC } from 'react';
import { MessageSquare, Lightbulb, Code, HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  onSendMessage: (message: string) => void;
}

const suggestions = [
  {
    icon: MessageSquare,
    title: "解释量子计算",
    subtitle: "用简单的语言"
  },
  {
    icon: Code,
    title: "写一个 Python 函数",
    subtitle: "用于反转字符串"
  },
  {
    icon: Lightbulb,
    title: "给我一些点子",
    subtitle: "关于周末的小项目"
  },
  {
    icon: HelpCircle,
    title: "如何在 CSS 中",
    subtitle: "垂直居中一个 div？"
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
          有什么我可以帮你的吗？
        </h1>
        <p className="text-chat-text-secondary">
          随便问点什么 —— 我可以帮你解答问题、激发创意、编写代码等等。
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
