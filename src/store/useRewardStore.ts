import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RewardStore {
  coins: number;
  addCoins: (amount: number) => void;
  redeemCoins: (amount: number) => boolean;
}

export const useRewardStore = create<RewardStore>()(
  persist(
    (set, get) => ({
      coins: 450, // Initial bonus for the user
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      redeemCoins: (amount) => {
        const currentCoins = get().coins;
        if (currentCoins >= amount) {
          set({ coins: currentCoins - amount });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'woxly-reward-storage',
    }
  )
);
