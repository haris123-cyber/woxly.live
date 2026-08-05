import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Product } from "./useCartStore";

interface WatchlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWatchlist: (productId: string) => boolean;
  getWatchlistCount: () => number;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return { items: state.items.filter((item) => item.id !== product.id) };
          }
          return { items: [...state.items, product] };
        }),
      isInWatchlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      getWatchlistCount: () => {
        return get().items.length;
      },
      clearWatchlist: () => set({ items: [] }),
    }),
    {
      name: "woxly-watchlist-storage",
    }
  )
);
