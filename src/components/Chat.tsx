import { useState, useRef, useEffect, FC } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { Message } from '../types/chat';
import { sendMessageToAI } from '../services/ai';

export const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };

    // Optimistically update UI
    const newHistory = [...messages, userMessage];
    setMessages([...newHistory, loadingMessage]);
    setIsLoading(true);

    try {
      // Convert to API format
      const apiMessages = newHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendMessageToAI(apiMessages);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: response, isLoading: false }
            : msg
        )
      );
    } catch (error: any) {
      const errorMessage = error.message?.includes('API Key') 
        ? error.message 
        : '抱歉，我遇到了一些错误。请检查您的网络或 API 配置。';
        
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { 
                ...msg, 
                content: errorMessage, 
                isLoading: false 
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopGeneration = () => {
    setIsLoading(false);
    setMessages(prev => 
      prev.map(msg => 
        msg.isLoading 
          ? { ...msg, content: '响应已停止。', isLoading: false }
          : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-chat-bg">
      {/* Header */}
      <div className="border-b border-chat-border/20 bg-chat-bg">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-lg font-semibold text-chat-text">AI 助手</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scrollbar">
        {messages.length === 0 ? (
          <EmptyState onSendMessage={handleSendMessage} />
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onStopGeneration={handleStopGeneration}
      />
    </div>
  );
};
