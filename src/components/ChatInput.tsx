import { useState, useRef, useEffect, FC } from 'react';
import { Send, Square } from 'lucide-react';
import { clsx } from 'clsx';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onStopGeneration?: () => void;
}

export const ChatInput: FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  onStopGeneration 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStop = () => {
    onStopGeneration?.();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const canSend = message.trim().length > 0 && !isLoading;

  return (
    <div className="border-t border-chat-border/20 bg-chat-bg">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="relative bg-chat-input rounded-xl border border-chat-border/30 focus-within:border-chat-border/50 transition-colors">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="w-full bg-transparent text-chat-text placeholder-chat-text-secondary p-4 pr-12 resize-none outline-none max-h-32 min-h-[24px]"
              rows={1}
              disabled={isLoading}
            />
            
            <div className="absolute right-3 bottom-3">
              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="p-1.5 rounded-md bg-chat-text-secondary hover:bg-chat-text transition-colors"
                  title="Stop generation"
                >
                  <Square size={16} className="text-chat-bg" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canSend}
                  className={clsx(
                    'p-1.5 rounded-md transition-colors',
                    canSend
                      ? 'bg-chat-green hover:bg-chat-green/80 text-white'
                      : 'bg-chat-text-secondary/20 text-chat-text-secondary cursor-not-allowed'
                  )}
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <p className="text-xs text-chat-text-secondary">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
