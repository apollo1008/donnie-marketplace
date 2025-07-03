'use client';

import { ItemCard } from './item-card';

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  seller_email: string;
  image_url?: string;
  location?: string;
  created_at: string;
}

interface ItemGridProps {
  listings: Listing[];
}

export function ItemGrid({ listings }: ItemGridProps) {
  if (listings.length === 0) {
    return <p className="text-center text-muted-foreground text-sm mt-10">No listings found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          category={item.category}
          imageUrl={item.image_url}
          location={item.location}
        />
      ))}
    </div>
  );
}
