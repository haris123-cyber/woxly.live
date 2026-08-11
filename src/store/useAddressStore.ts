import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  name?: string;
  phone: string;
  email?: string;
  addressLine: string;
  pinCode: string;
  city: string;
  state: string;
  label?: string;
  icon?: "home" | "office";
}

// Convert legacy lines array back into string when migrating, or just build new string
export const INITIAL_ADDRESSES: Address[] = [
  {
    id: "home",
    label: "Home",
    icon: "home",
    name: "Rahul Sharma",
    phone: "9876543210",
    addressLine: "123 Main Street, Apt 4B",
    pinCode: "110001",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    id: "office",
    label: "Office",
    icon: "office",
    name: "Rahul Sharma",
    phone: "9123456780",
    addressLine: "450 Tech Park, Floor 12",
    pinCode: "560001",
    city: "Bengaluru",
    state: "Karnataka",
  },
];

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Address) => void;
  deleteAddress: (id: string) => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: INITIAL_ADDRESSES,
      addAddress: (address) =>
        set((state) => ({ addresses: [...state.addresses, address] })),
      updateAddress: (id, updatedAddress) =>
        set((state) => ({
          addresses: state.addresses.map((a) => (a.id === id ? updatedAddress : a)),
        })),
      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
    }),
    {
      name: 'woxly-address-storage',
    }
  )
);
