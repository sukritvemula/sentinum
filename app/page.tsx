'use client';
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TopBar } from '@/components/layout/TopBar';
import { Search, Paperclip } from 'lucide-react';

export default function HomePage() {
  // Remove isInitial since we're not using it
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <TopBar 
          spaceName="Personal Space"
          title="Welcome to Sentium"
        />
        
        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
          <div className="flex items-center gap-3 mb-1">
            <img 
              src="/logo.png" 
              alt="Sentium Logo" 
              className="w-8 h-8 animate-[spin_3s_linear_infinite]"
            />
            <h1 className="text-xl font-medium">Welcome to Sentium</h1>
          </div>
          <p className="text-sm text-gray-500 mb-16">Your AI assistant for everything</p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Sentium..."
                className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none"
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
      </div>
    </MainLayout>
  );
}