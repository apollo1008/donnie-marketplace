'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith('/create/item');

  return (
    <main className="flex max-w-7xl mx-auto px-4 sm:px-6 mt-6">
      {showSidebar && (
        <div className="hidden sm:block w-64 pr-6">
          <Sidebar />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </main>
  );
}
