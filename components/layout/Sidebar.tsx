'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Plus, Home, Compass, Layout, History, Settings, User, MoreVertical, Trash2, Edit, LogOut } from 'lucide-react';

interface ChatItem {
  id: string;
  title: string;
  date: string;
}

interface SidebarProps {
  chats?: ChatItem[];
  userName?: string;
  onChatDelete?: (chatId: string) => void;
  onChatRename?: (chatId: string, newTitle: string) => void;
  onDeleteAllChats?: () => void;
  onLogout?: () => void;
}

export function Sidebar({
  chats = [
    { id: '1', title: 'Next.js vs React.js - Which is Best?', date: '2025-02-02' },
    { id: '2', title: 'Hi', date: '2025-02-01' },
    { id: '3', title: 'I want to create my own LLM', date: '2025-01-30' },
    { id: '4', title: 'Successful Startups in Key Tech Sectors', date: '2025-01-15' },
  ],
  userName = "S",
  onChatDelete,
  onChatRename,
  onDeleteAllChats,
  onLogout,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const classifyChats = () => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);
    const last7DaysStart = new Date(todayStart);
    last7DaysStart.setDate(todayStart.getDate() - 7);

    return {
      today: chats.filter((chat) => new Date(chat.date) >= todayStart),
      yesterday: chats.filter(
        (chat) =>
          new Date(chat.date) < todayStart && new Date(chat.date) >= yesterdayStart
      ),
      last7Days: chats.filter(
        (chat) =>
          new Date(chat.date) < yesterdayStart && new Date(chat.date) >= last7DaysStart
      ),
      older: chats.filter((chat) => new Date(chat.date) < last7DaysStart),
    };
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenuId(null);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const classifiedChats = classifyChats();

  return (
    <aside className="w-52 h-full bg-[#F9FBFF] flex flex-col shadow-lg">
      {/* Branding */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200 pl-5">
        <span className="text-xl font-serif font-bold text-gray-800">sentinum</span>
      </div>

      {/* Search Bar */}
      <div className="h-12 flex items-center px-3 border-b border-gray-200">
        <div className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-full shadow-sm text-gray-600 hover:border-gray-400 transition w-full">
          <Search size={14} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 bg-transparent text-xs focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="px-3 py-2 space-y-1">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-gray-100 text-gray-700 transition">
          <Home size={14} />
          <span>Home</span>
        </button>

        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-gray-100 text-gray-700 transition">
          <Compass size={14} />
          <span>Discover</span>
        </button>

        <div
          onMouseEnter={() => setHoveredSection('spaces')}
          onMouseLeave={() => setHoveredSection(null)}
          className="relative w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-gray-100 text-gray-700 transition cursor-pointer"
        >
          <Layout size={14} />
          <span>Spaces</span>
          {hoveredSection === 'spaces' && (
            <Plus size={14} className="absolute right-2 text-blue-500 cursor-pointer" />
          )}
        </div>

        <div
          className="relative w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          onClick={() => setHistoryExpanded(!historyExpanded)}
        >
          <History size={14} />
          <span>History</span>
          <Plus size={14} className={`absolute right-2 text-blue-500 transition-transform ${historyExpanded ? 'rotate-45' : ''}`} />
        </div>
      </div>

      {/* Chat History Subsection */}
      {historyExpanded && (
        <div className="flex flex-col px-3 space-y-1 overflow-y-auto">
          {Object.entries(classifiedChats).map(([key, items]) => (
            items.length > 0 && (
              <div key={key} className="mb-1">
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1 pl-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <div className="border-l-2 border-gray-200 pl-2 space-y-0.5">
                  {items.map((chat) => (
                    <div
                      key={chat.id}
                      className="group relative w-full px-2 py-1 rounded-md text-xs flex items-center cursor-pointer hover:bg-gray-100 text-gray-700 transition"
                    >
                      <span className="truncate">{chat.title}</span>
                      <button
                        className="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(chat.id === openMenuId ? null : chat.id);
                        }}
                      >
                        <MoreVertical size={14} />
                      </button>
                      
                      {openMenuId === chat.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        >
                          <button
                            className="w-32 px-3 py-2 text-xs text-left hover:bg-gray-100 flex items-center gap-2"
                            onClick={() => onChatRename?.(chat.id, prompt('Enter new name:') || chat.title)}
                          >
                            <Edit size={12} /> Rename
                          </button>
                          <button
                            className="w-32 px-3 py-2 text-xs text-left hover:bg-gray-100 flex items-center gap-2 text-red-500"
                            onClick={() => onChatDelete?.(chat.id)}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* User Section */}
      <div className="mt-auto border-t border-gray-200 p-3 relative">
        <div 
          ref={userMenuRef}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
            {userName}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-700">User Account</p>
            <p className="text-[11px] text-gray-500">user@example.com</p>
          </div>
          <Settings size={14} className="text-gray-500" />
        </div>

        {userMenuOpen && (
          <div className="absolute bottom-full mb-2 left-3 right-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-2 text-xs text-gray-700 font-medium border-b border-gray-200">
              Account Settings
            </div>
            <button className="w-full px-3 py-2 text-xs text-left hover:bg-gray-100 flex items-center gap-2">
              <User size={12} /> Profile
            </button>
            <button className="w-full px-3 py-2 text-xs text-left hover:bg-gray-100 flex items-center gap-2">
              <Settings size={12} /> Settings
            </button>
            <button 
              className="w-full px-3 py-2 text-xs text-left hover:bg-gray-100 flex items-center gap-2 text-red-500"
              onClick={onDeleteAllChats}
            >
              <Trash2 size={12} /> Delete All Chats
            </button>
            <button 
              className="w-full px-3 py-2 text-xs text-left hover:bg-gray-100 flex items-center gap-2 text-red-500"
              onClick={onLogout}
            >
              <LogOut size={12} /> Log Out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}