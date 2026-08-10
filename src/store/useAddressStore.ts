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
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    addressLine: "123 Main Street, Apt 4B",
    pinCode: "10001",
    city: "New York",
    state: "NY",
  },
  {
    id: "office",
    label: "Office",
    icon: "office",
    name: "John Doe",
    phone: "+1 (555) 987-6543",
    addressLine: "450 Park Avenue, Floor 12",
    pinCode: "10022",
    city: "New York",
    state: "NY",
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
