"use client"

import { useEffect } from "react"
import { ArtistCard } from "./ArtistCard"
import { Artist } from "@/lib/types"
import { useArtistStore } from "@/stores/artistsStore"
import Masonry from "react-masonry-css"

interface Props {
  artists: Artist[]
}

export function ArtistGrid({ artists }: Props) {
  const setArtists = useArtistStore((state) => state.setArtists)

  useEffect(() => {
    setArtists(artists)
  }, [artists, setArtists])

  return (
    <div className="columns-2 md:columns-3 lg:columns-5 gap-3 space-y-3 artist-grid">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}
