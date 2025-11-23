import { create } from 'zustand';

interface GlobalState {
  query: string;
  setQuery: (value: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  query: '',

  setQuery: (value: string) => set({ query: value }),
}));
