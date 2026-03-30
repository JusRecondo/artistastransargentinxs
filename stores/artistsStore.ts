import { Artist } from "@/lib/types";
import { create } from "zustand";


interface ArtistState {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
  getArtistBySlug: (slug: string) => Artist | undefined;
}

export const useArtistStore = create<ArtistState>((set, get) => ({
  artists: [],
  setArtists: (artists) => set({ artists }),
  getArtistBySlug: (slug) => get().artists.find((a) => a.slug === slug),
}));