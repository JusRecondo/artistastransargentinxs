"use client"

import ArtistImage from "@/components/ArtistImage"
import BackBtn from "@/components/BackBtn"
import Loader from "@/components/Loader"
import { getArtists } from "@/lib/sheets"
import { Artist } from "@/lib/types"
import { useArtistStore } from "@/stores/artistsStore"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ArtistPage() {
  const { slug } = useParams();
  const getArtistBySlug = useArtistStore((state) => state.getArtistBySlug);
  const [artist, setArtist] = useState<Artist | undefined>(() => getArtistBySlug(slug!.toString()));
  const [loading, setLoading] = useState(!artist);

  useEffect(() => {
    if (!artist) {
      getArtists().then((allArtists) => {
        const validArtists: Artist[] = allArtists.filter((a) => a.visible);
        const store = useArtistStore.getState();
        store.setArtists(validArtists); // setear en Zustand
        setArtist(validArtists.find((a) => a.slug === slug!) || undefined);
        setLoading(false);
      });
    }
  }, [artist, slug]);

  if(loading) return <Loader />

  if (!artist) return notFound()

  return (
    <main className="px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-2xl">
          <ArtistImage src={artist.foto_url} alt={artist.nombre} nombre={artist.nombre} />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {artist.nombre}
          </h1>

          <p className="text-neutral-500 mt-1">{artist.pronombres}</p>

          <p className="mt-6">{artist.presentacion}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {artist.disciplinas.map((d: string) => (
              <span key={d} className="text-xs border px-2 py-1 rounded-full">
                {d}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {artist.links.map((link: string) => (
              <a
                key={link}
                href={link}
                target="_blank"
                className="underline text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <BackBtn />
      </div>
    </main>
  )
}
