import { getArtists } from "@/lib/sheets"
import { ArtistCard } from "@/components/ArtistCard"
import { shuffle } from "@/lib/utils"
import { Artist } from "@/lib/types"
import { ArtistGrid } from "@/components/ArtistsGrid"
import Loader from "@/components/Loader"

export default async function Home() {
  const artists: Artist[] = await getArtists()
  const shuffled = shuffle([...artists])

  return (
    <main className="px-3 md:px-6 py-6">
      
      <header className="mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Archivo Vivo de Artistas Trans Argentinxs
        </h1>
      </header>

      {
        !artists.length ? <Loader /> : <ArtistGrid artists={shuffled} />
      }

    </main>
  )
}