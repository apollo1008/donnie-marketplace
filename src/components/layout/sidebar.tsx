'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tag, UserCircle, ClipboardList } from 'lucide-react';

const categories = [
  'Vehicles', 'Fashion', 'Property Rentals', 'Apparel', 'Classifieds',
  'Electronics', 'Entertainment', 'Family', 'Free Stuff', 'Garden & Outdoor',
  'Hobbies', 'Home Goods', 'Home Improvement', 'Home Sales',
  'Musical Instruments', 'Office Supplies', 'Pet Supplies', 'Sporting Goods',
  'Toys & Games', 'Buy and sell groups', 'Other'
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="space-y-6 w-full">
      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Quick Actions</h3>
        <div className="flex flex-col space-y-2 text-sm text-gray-700">
          <SidebarLink
            href="/create"
            icon={<Tag className="w-4 h-4" />}
            label="Choose listing type"
            active={pathname === '/create'}
          />
          <SidebarLink
            href="/"
            icon={<ClipboardList className="w-4 h-4" />}
            label="Your listings"
          />
          <SidebarLink
            href="/"
            icon={<UserCircle className="w-4 h-4" />}
            label="Seller help"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">Categories</h3>
        <div className="flex flex-col space-y-1 text-sm text-gray-700">
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/ /g, '-');
            const isActive = pathname === `/category/${slug}`;
            return (
              <Link
                key={cat}
                href={`/category/${slug}`}
                className={cn(
                  'px-3 py-2 rounded-md transition-colors duration-200',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200',
        active
          ? 'bg-blue-50 text-blue-700 font-semibold'
          : 'hover:bg-gray-100 text-gray-700'
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
