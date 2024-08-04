// src/store.ts
import create from 'zustand';

interface StoreState {
  user: any; // Update with the appropriate type if you have one
  setUser: (user: any) => void;
}

const useStore = create<StoreState>(set => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
