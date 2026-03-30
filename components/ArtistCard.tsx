'use client'
import { Artist } from "@/lib/types"
import Link from "next/link"
import { ArtistImage } from "./ArtistImage"

interface Props {
  artist: Artist
}

export const ArtistCard = ({ artist }: Props) => {
  return (
    <Link
      href={`/artista/${artist.slug}`}
      className="group block break-inside-avoid artist-card"
    >
      <div className="relative overflow-hidden rounded-xl h-full">
        <ArtistImage src={artist.foto_url} alt={artist.nombre} nombre={artist.nombre} />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-black/10 lg:opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-3 lg:opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition duration-300">
          <h3 className="text-white text-sm font-medium">{artist.nombre}</h3>
          <p className="text-white/70 text-xs">{artist.pronombres}</p>
        </div>
      </div>
    </Link>
  )
}
