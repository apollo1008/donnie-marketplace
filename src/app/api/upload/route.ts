import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileName = `public/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('listing-images')
    .upload(fileName, file, { upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: publicUrl } = supabase.storage
    .from('listing-images')
    .getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl.publicUrl });
}
