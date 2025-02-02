// components/chat/InputArea.tsx
'use client';
import { useState } from 'react';
import { Search, Paperclip } from 'lucide-react';

interface InputAreaProps {
  isInitial?: boolean;
  onSubmit?: (message: string) => void;
}

export function InputArea({ isInitial = true, onSubmit }: InputAreaProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className={`${isInitial ? 'absolute left-1/2 top-[55%] -translate-x-1/2' : 'sticky bottom-6'} w-full max-w-2xl px-4`}>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Sentium..."
            className="w-full px-4 py-3.5 bg-transparent text-sm focus:outline-none rounded-xl"
          />
          <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-gray-100">
            <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Search size={18} className="text-gray-400" />
            </button>
            <button type="button" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}