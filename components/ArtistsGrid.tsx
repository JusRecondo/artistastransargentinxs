"use client"

import { useEffect, useMemo } from "react"
import { ArtistCard } from "./ArtistCard"
import { Artist } from "@/lib/types"
import { useArtistStore } from "@/stores/artistsStore"
import { shuffle } from "@/lib/utils"

interface Props {
  artists: Artist[]
}

export function ArtistGrid({ artists }: Props) {
  const setArtists = useArtistStore((state) => state.setArtists)
  const artistsFromStore = useArtistStore((state) => state.artists)

  useEffect(() => {
    const shuffled = shuffle([...artists])
    setArtists(shuffled)
  }, [artists, setArtists])

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3 artist-grid">
      {artistsFromStore.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}
