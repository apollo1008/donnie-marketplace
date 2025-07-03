'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  category: string;
  location?: string;
}

export function ItemCard({
  id,
  title,
  price,
  imageUrl,
  category,
  location = 'Palo Alto, CA',
}: ItemCardProps) {
  return (
    <Card
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01]'
      )}
    >
      {/* Image */}
      <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">No image</div>
        )}
      </div>

      {/* Header */}
      <CardHeader className="pb-2 px-4 pt-4 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{title}</h3>
          <Badge variant="outline" className="text-xs px-2 py-0.5 capitalize">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{location}</p>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 pt-0 pb-3">
        <p className="text-xl font-bold text-blue-600">${price.toFixed(2)}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-4 pb-4 pt-0 mt-auto">
        <Button asChild className="w-full text-sm font-medium">
          <Link href={`/item/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
