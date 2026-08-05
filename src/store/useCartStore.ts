import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  slug: string;
  rating: number;
  reviews: number;
  description?: string;
  inStock: boolean;
  isNew?: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, color, size) => {
        set((state) => {
          // Check if item with same options already exists
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          const cartItemId = `${product.id}-${color || 'default'}-${size || 'default'}`;
          
          return {
            items: [
              ...state.items,
              {
                ...product,
                cartItemId,
                quantity,
                selectedColor: color,
                selectedSize: size,
              },
            ],
          };
        });
      },
      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },
      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'woxly-cart-storage',
    }
  )
);
