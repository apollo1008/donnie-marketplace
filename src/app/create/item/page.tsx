'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialErrors = {
  title: '',
  price: '',
  email: '',
  category: '',
};

function FormError({ message }: { message: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
}

export default function CreateListingPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = () => {
    const newErrors = {
      title: title.trim() ? '' : 'Title is required',
      price: price && parseFloat(price) > 0 ? '' : 'Enter a valid price',
      email: /^\S+@\S+\.\S+$/.test(email) ? '' : 'Enter a valid email',
      category: category ? '' : 'Category is required',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) setImageUrl(data.url);
      else console.error('Upload error:', data.error);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent | any) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file) handleUpload(file);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          location,
          price: parseFloat(price),
          seller_email: email,
          category,
          image_url: imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      router.push('/');
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-6">
      {/* Form Section */}
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md border">
        <h1 className="text-2xl font-semibold">Create a New Listing</h1>
        

        <div className="space-y-4">
          <Label htmlFor="title">Photo</Label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            className={cn(
              'w-full p-6 text-center border-2 border-dashed rounded-md transition cursor-pointer',
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            )}
          >
            {uploading ? (
              <div className="flex justify-center items-center gap-2 text-blue-600 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading image...
              </div>
            ) : imageUrl ? (
              <img src={imageUrl} alt="Preview" className="h-40 object-contain mx-auto rounded-md" />
            ) : (
              <p className="text-gray-400 text-sm">Click or drag an image to upload</p>
            )}
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleDrop}
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a catchy title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title && 'border-red-500'}
            />
            <FormError message={errors.title} />
          </div>

          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="Describe your item (optional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. New York, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={errors.price && 'border-red-500'}
              />
              <FormError message={errors.price} />
            </div>

            <div className="w-1/2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email && 'border-red-500'}
              />
              <FormError message={errors.email} />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className={cn(errors.category && 'border-red-500')}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormError message={errors.category} />
          </div>

          

          <Button
            className="w-full"
            disabled={loading || uploading}
            onClick={handleSubmit}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Posting...
              </span>
            ) : (
              'Post Listing'
            )}
          </Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <p className="text-xl font-semibold">Live Preview</p>
        {imageUrl && <img src={imageUrl} className="rounded-md h-40 object-cover w-full" />}
        <h2 className="text-lg font-medium">{title || 'Listing Title'}</h2>
        <p><b>Description</b></p>
        <p className="text-sm text-muted-foreground">{desc || 'Listing description will appear here.'}</p>
        <p className="text-base font-semibold">{price ? `$${price}` : '$0.00'}</p>
        <p><b>Seller Info</b></p>
        <p className="text-sm text-gray-500">{email || 'seller@example.com'}</p>
      </div>
    </div>
  );
}
