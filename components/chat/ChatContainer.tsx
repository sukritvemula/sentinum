// components/chat/ChatContainer.tsx
'use client';

interface ChatContainerProps {
  isInitial?: boolean;
  children?: React.ReactNode;
}

export function ChatContainer({ isInitial = true, children }: ChatContainerProps) {
  return (
    <div className="flex flex-col h-full">
      {isInitial ? (
        <div className="flex-1 flex flex-col items-center justify-center -mt-32">
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
      ) : (
        <div className="flex-1 overflow-y-auto px-4">
          {children}
        </div>
      )}
    </div>
  );
}