// components/layout/MainLayout.tsx
import { Sidebar } from './Sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <Sidebar userName="John Doe" />

      {/* Main Content Area */}
      <main className="flex-grow bg-white shadow-md rounded-lg m-2 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}