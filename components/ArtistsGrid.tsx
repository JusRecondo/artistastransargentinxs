"use client"

import { useEffect, useMemo } from "react"
import { ArtistCard } from "./ArtistCard"
import { Artist } from "@/lib/types"
import { useArtistStore } from "@/stores/artistsStore"
import { useSearchStore } from "@/stores/searchStore"

interface Props {
  artists: Artist[]
}

export function ArtistGrid({ artists }: Props) {
  const setArtists = useArtistStore((state) => state.setArtists)
  const query = useSearchStore((state) => state.searchQuery)

  useEffect(() => {
    setArtists(artists)
  }, [artists, setArtists])

  const filteredArtists = useMemo(() => {
    return artists.filter((item) =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    )
  }, [artists, query])

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3 artist-grid">
      {filteredArtists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}
