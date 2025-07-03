import './globals.css';
import { Header } from '@/components/layout/header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LayoutWrapper } from '@/components/layout/layout-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'A Facebook-style Marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-slate-50 text-gray-900', inter.className)}>
        <Header />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
