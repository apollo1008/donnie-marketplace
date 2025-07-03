// app/create/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const listingTypes = [
  {
    title: 'Item for sale',
    description: 'Lorem ipsum dolor sit',
    icon: '/icons/item.png',
    slug: 'item'
  },
  {
    title: 'Create multiple listings',
    description: 'Lorem ipsum dolor sit',
    icon: '/icons/multiple.png',
    slug: 'multiple'
  },
  {
    title: 'Vehicle for sale',
    description: 'Lorem ipsum dolor sit',
    icon: '/icons/vehicle.png',
    slug: 'vehicle'
  },
  {
    title: 'Home for sale or rent',
    description: 'Lorem ipsum dolor sit',
    icon: '/icons/home.png',
    slug: 'home'
  }
];

export default function ChooseListingTypePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-8">Choose listing type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {listingTypes.map((type) => (
          <div
            key={type.slug}
            onClick={() => router.push(`/create/item?type=${type.slug}`)}
            className="cursor-pointer rounded-xl bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 border border-transparent transition duration-200"
          >
            <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center"><div class="w-10 h-10 bg-gray-300 rounded-full"></div></div>
            <h3 className="text-center font-medium text-lg mb-1">{type.title}</h3>
            <p className="text-center text-sm text-gray-500">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
