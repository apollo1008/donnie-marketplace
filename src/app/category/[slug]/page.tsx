'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ItemGrid } from '@/components/marketplace/item-grid';
import { Loader2 } from 'lucide-react';

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

export default function CategoryPage() {
  const { slug } = useParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchCategory(slug.toString());
  }, [slug]);

  const fetchCategory = async (category: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      if (res.ok) setListings(data);
      else console.error('Fetch error:', data.error);
    } catch (err) {
      console.error('Network error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold capitalize">{slug} Listings</h1>
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : listings.length === 0 ? (
        <p className="text-muted-foreground">No listings found in this category.</p>
      ) : (
        <ItemGrid listings={listings} />
      )}
    </div>
  );
}
