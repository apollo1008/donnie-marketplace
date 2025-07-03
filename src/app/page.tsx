'use client';

import { useEffect, useState } from 'react';
import { ItemGrid } from '@/components/marketplace/item-grid';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '../components/ui/button';

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

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings?q=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (res.ok) setListings(data);
      else console.error('Fetch error:', data.error);
    } catch (err) {
      console.error('Network error:', err);
    }
    setLoading(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Today's pick</h1>
        <div style={{display:"flex"}}>
        <Input
          type="text"
          placeholder="Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={() => fetchListings()} style={{marginLeft: "20px"}}>Search</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ItemGrid listings={listings} />
      )}
    </section>
  );
}
