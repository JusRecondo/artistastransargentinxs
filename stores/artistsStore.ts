import { Artist } from "@/lib/types";
import { create } from "zustand";


interface ArtistState {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
  getArtistBySlug: (slug: string) => Artist | undefined;
  searchQuery: string;
  filters: {},
  setSearchQuery: (query: string) => void;
  setFilter: (filterName: string, value: any) => void;
  triggerSearch: () => void;
}

export const useArtistStore = create<ArtistState>((set, get) => ({
  artists: [],
  setArtists: (artists) => {set({ artists })},
  getArtistBySlug: (slug) => get().artists.find((a) => a.slug === slug),
  searchQuery: '',
  filters: {},
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setFilter: (filterName, value) =>
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
    })),
  triggerSearch: async () => {
    const state = useArtistStore.getState(); 
    console.log("Searching for:", state.searchQuery, state.filters);
  },
}));