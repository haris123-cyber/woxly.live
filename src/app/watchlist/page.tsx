"use client";

import Link from "next/link";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WatchlistPage() {
  const router = useRouter();
  const { items, clearWatchlist } = useWatchlistStore();

  return (
    <div className="bg-background min-h-screen pt-4 lg:pt-0">

      <div className="container mx-auto px-4 py-4 md:py-12 min-h-[70vh]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-heading">My Watchlist</h1>
          {items.length > 0 && (
            <Button variant="outline" onClick={clearWatchlist} className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
              Clear All
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven&apos;t saved any items yet. Explore our products and add them to your watchlist to keep track of what you love.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-md">
              <Link href="/shop">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
