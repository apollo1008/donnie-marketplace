import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const listing_id = searchParams.get('listing_id');

  if (!listing_id) {
    return NextResponse.json({ error: 'Missing listing_id' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('listing_id', listing_id)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { listing_id, message, buyer_email, seller_email } = body;

  if (!listing_id || !message || !buyer_email || !seller_email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data, error } = await supabase.from('messages').insert([
    {
      listing_id,
      message,
      buyer_email,
      seller_email,
    },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
