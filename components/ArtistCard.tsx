'use client'
import { Artist } from "@/lib/types"
import Link from "next/link"

interface Props {
  artist: Artist
}

export function ArtistCard({ artist }: Props) {
  return (
    <Link
      href={`/artista/${artist.slug}`}
      className="group block break-inside-avoid"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={artist.foto_url}
          alt={artist.nombre}
          className="w-full h-auto object-cover transition duration-500 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.net/400x400.png"
          }}
        />

        <div className="absolute inset-0 `bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-white text-sm font-medium">{artist.nombre}</h3>
          <p className="text-white/70 text-xs">{artist.pronombres}</p>
        </div>
      </div>
    </Link>
  )
}
