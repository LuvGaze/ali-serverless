import { useState, useRef, useEffect, FC } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { Message } from '../types/chat';

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

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on user input
    const responses = [
      "That's an interesting question! Let me think about that for a moment.",
      "I understand what you're asking. Here's my perspective on that topic.",
      "Great question! This is actually a complex topic with several aspects to consider.",
      "I'd be happy to help you with that. Let me break this down for you.",
      "That's a thoughtful inquiry. Based on my understanding, here's what I can tell you.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('programming')) {
      return `Here's a programming-related response: ${randomResponse}\n\nFor coding questions, I can help with various programming languages, debugging, best practices, and more. Feel free to share your specific code or describe what you're trying to accomplish!`;
    }
    
    if (userMessage.toLowerCase().includes('explain') || userMessage.toLowerCase().includes('what is')) {
      return `Let me explain that concept: ${randomResponse}\n\nI'll break this down into simple terms and provide examples where helpful. Is there a specific aspect you'd like me to focus on?`;
    }
    
    return `${randomResponse}\n\nI'm here to help with a wide range of topics including programming, creative writing, analysis, math, and general questions. What would you like to explore further?`;
  };

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

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: response, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { 
                ...msg, 
                content: 'Sorry, I encountered an error while processing your request. Please try again.', 
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
          ? { ...msg, content: 'Response generation stopped.', isLoading: false }
          : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-chat-bg">
      {/* Header */}
      <div className="border-b border-chat-border/20 bg-chat-bg">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-lg font-semibold text-chat-text">AI Assistant</h1>
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
