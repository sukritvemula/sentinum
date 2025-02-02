import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900">
        {children}
      </body>
    </html>
  );
}
