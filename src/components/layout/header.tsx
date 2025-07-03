'use client';

import { Input } from '@/components/ui/input';
import { LayoutGrid, PlusCircle, Search, User } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-tight text-gray-900 hover:text-primary transition-colors">
          Marketplace
        </Link>


        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-600">
          <Link href="/" title="Browse" className="hover:text-blue-600 transition">
            <LayoutGrid className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
