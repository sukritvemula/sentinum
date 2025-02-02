// components/chat/ChatMessages.tsx
'use client';

interface ChatMessagesProps {
  children?: React.ReactNode;
  isInitial: boolean;
}

export function ChatMessages({ children, isInitial }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {isInitial && (
        <div className="h-full flex flex-col items-center justify-center -mt-32">
          <div className="flex flex-col items-center space-y-2">
            <img 
              src="/logo.png" 
              alt="Sentium Logo" 
              className="w-16 h-16 mb-6"
            />
            <h1 className="text-2xl font-medium text-gray-900">
              Welcome to Sentium
            </h1>
            <p className="text-sm text-gray-500">
              Your AI assistant for everything
            </p>
          </div>
        </div>
      )}
      <div className="p-4 space-y-4">
        {children}
      </div>
    </div>
  );
}