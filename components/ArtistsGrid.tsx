"use client"

import { useEffect, useMemo } from "react"
import { ArtistCard } from "./ArtistCard"
import { Artist } from "@/lib/types"
import { useArtistStore } from "@/stores/artistsStore"
import { useSearchStore } from "@/stores/searchStore"
import { useSearchParams } from "next/navigation"

interface Props {
  artists: Artist[]
}

export function ArtistGrid({ artists }: Props) {
  const setArtists = useArtistStore((state) => state.setArtists)
  const query = useSearchStore((state) => state.searchQuery)
  const filters = useSearchStore((state) => state.filters)
  const resetFilters = useSearchStore((state) => state.resetFilters)

  const searchParams = useSearchParams()
  const urlFilter = searchParams.get('disciplina') || null

  useEffect(() => {
    if(!urlFilter) {
      resetFilters()
    }
    setArtists(artists)
  }, [artists, setArtists, resetFilters,urlFilter])

  const searchedArtists = useMemo(() => {
    return artists.filter((item) =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    )
  }, [artists, query])


  const filteredArtists = useMemo(() => {
    return searchedArtists.filter((artist) => {
      if (filters.disciplina && !artist.disciplinas.includes(filters.disciplina)) {
        return false;
      }
      return true;
    });
  }, [searchedArtists, filters]);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3 artist-grid">
      {filteredArtists.length > 0 ? (
        filteredArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))
      ) : (
        <p className="text-center text-gray-700 col-span-full">
          No se encontraron artistas.
        </p>
      )}
    </div>
  )
}
