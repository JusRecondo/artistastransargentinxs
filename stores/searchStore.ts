import { create } from "zustand";


interface SearchState {
  searchQuery: string;
  filters: {},
  setSearchQuery: (query: string) => void;
  setFilter: (filterName: string, value: any) => void;
  triggerSearch: () => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchQuery: '',
  filters: {},
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setFilter: (filterName, value) =>
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
    })),
  triggerSearch: async () => {
    const state = useSearchStore.getState(); 
    console.log("Searching for:", state.searchQuery);
  },
  resetSearch: () => set({ searchQuery: '' }),
}));