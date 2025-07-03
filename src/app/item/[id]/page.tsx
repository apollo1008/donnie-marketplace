'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller_email: string;
  image_url?: string;
  location?: string;
  created_at: string;
}

export default function ItemDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [message, setMessage] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (id) fetchListing(id.toString());
  }, [id]);

  const fetchListing = async (listingId: string) => {
    try {
      const res = await fetch(`/api/listings?id=${listingId}`);
      const data = await res.json();
      if (res.ok) setListing(data[0] || null);
      else console.error(data.error);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message || !buyerEmail || !listing?.seller_email) return;

    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listing_id: id,
          message,
          buyer_email: buyerEmail,
          seller_email: listing.seller_email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Message error:', data.error);
        return;
      }

      setMessage('');
      setSent(true);
    } catch (err) {
      console.error('Message failed:', err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!listing) {
    return (
      <p className="text-center mt-10 text-muted-foreground">Listing not found.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-xl shadow-sm p-6 border">
        {/* Left: Image */}
        <div className="rounded-lg overflow-hidden bg-gray-100 aspect-[4/3]">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              className="object-cover w-full h-full transition-all"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">{listing.title}</h1>

          <div className="flex items-center gap-3">
            <p className="text-xl font-bold text-blue-600">${listing.price.toFixed(2)}</p>
            <Badge variant="outline" className="capitalize">{listing.category}</Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            {listing.location || 'Location not specified'}
          </div>

          <div>
            <h3 className="font-medium text-sm mb-1 text-gray-700">Description</h3>
            <p className="text-sm text-gray-600">{listing.description}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-1 text-gray-700">Seller Info</h3>
            <p className="text-sm text-gray-600">{listing.seller_email}</p>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900">Message Seller</h3>
        <Input
          placeholder="Your email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          type="email"
        />
        <Textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage} disabled={sending} className="w-full sm:w-auto">
          {sending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </Button>
        {sent && (
          <p className="text-sm text-green-600 font-medium">Message sent to seller!</p>
        )}
      </div>
        </div>
      </div>

      {/* Contact Form */}
      
    </div>
  );
}
