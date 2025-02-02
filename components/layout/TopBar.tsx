// components/layout/TopBar.tsx
interface TopBarProps {
  spaceName: string;
  title: string;
  actions?: React.ReactNode[];
}

export function TopBar({ spaceName, title, actions }: TopBarProps) {
  return (
    <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">{spaceName}</div>
      <h1 className="text-base font-medium text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        {actions?.map((action, index) => (
          <button key={index} className="p-1.5 hover:bg-gray-100 rounded-lg">
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}