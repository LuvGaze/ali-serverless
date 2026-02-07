import { FC } from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types/chat';
import { clsx } from 'clsx';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={clsx(
      'group w-full border-b border-chat-border/10',
      isUser ? 'bg-chat-bg' : 'bg-chat-hover'
    )}>
      <div className="flex gap-4 p-4 mx-auto max-w-3xl">
        <div className={clsx(
          'flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-white',
          isUser ? 'bg-chat-green' : 'bg-purple-600'
        )}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-chat-text leading-relaxed">
            {message.isLoading ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-chat-text-secondary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-chat-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-chat-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-chat-text-secondary text-sm">Thinking...</span>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {message.content.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 last:mb-0">
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
