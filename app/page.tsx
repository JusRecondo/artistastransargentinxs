'use client'
import { getArtists } from "@/lib/sheets"
import { ArtistGrid } from "@/components/ArtistsGrid"
import { Loader } from "@/components/Loader"
import { DrawerMenu } from "@/components/DrawerMenu"
import { shuffle } from "@/lib/utils"
import { useArtistStore } from "@/stores/artistsStore"
import { useEffect, useState } from "react"


export default function Home() {
  const setArtists = useArtistStore((state) => state.setArtists);
  const artists = useArtistStore((state) => state.artists)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists().then((fetched) => {
      const shuffled = shuffle(fetched);
      setArtists(shuffled);
      setLoading(false);
    });
  }, [setArtists]);

  if (loading) return <Loader />;

  return (
    <main className="px-3 md:px-6 py-6">
      <DrawerMenu />
      
      <header className="mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Archivo Vivo de Artistas Trans Argentinxs
        </h1>
      </header>

      {
        !artists.length ? <Loader /> : <ArtistGrid artists={artists} />
      }

    </main>
  )
}