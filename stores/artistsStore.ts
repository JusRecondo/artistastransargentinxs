import { Artist } from "@/lib/types";
import { create } from "zustand";


interface ArtistState {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
  getArtistBySlug: (slug: string) => Artist | undefined;
  filters: string;
  setFilters: (filters: string) => void;
  filteredArtists: (filters: string) => Artist[];
}

export const useArtistStore = create<ArtistState>((set, get) => ({
  artists: [],
  setArtists: (artists) => {set({ artists })},
  getArtistBySlug: (slug) => get().artists.find((a) => a.slug === slug),
  filters: '',
  setFilters: (filters: string) => set({ filters }),
  filteredArtists: (filters: string) => {
    const { artists } = get();
    return artists.filter((artist) => {
      const matchesSearch = filters 
        ? artist.nombre.toLowerCase().includes(filters.toLowerCase())
        : true;
      /* const matchesDisciplina = filters.disciplinas.length
        ? filters.disciplinas.includes(artist.disciplinas)
        : true; */
      return matchesSearch;
    })}
}));