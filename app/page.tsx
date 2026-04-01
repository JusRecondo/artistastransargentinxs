import { getArtists } from "@/lib/sheets"
import { Artist } from "@/lib/types"
import { ArtistGrid } from "@/components/ArtistsGrid"
import { Loader } from "@/components/Loader"
import { DrawerMenu } from "@/components/DrawerMenu"
import { shuffle } from "@/lib/utils"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

export default async function Home() {
  const artists: Artist[] = await getArtists()

  const shuffledArtists = shuffle(artists)

  return (
    <main className="px-3 md:px-6 py-6">
      <DrawerMenu />

      <header className="mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Archivo Vivo de Artistas Trans Argentinxs
        </h1>
        <p className="text-gray-700 mt-2">
          {" "}
          Sitio en construccion. Para sumarte al archivo
          completa el{" "}
          <a href="https://forms.gle/kZC8AedsxaZWXko38" className="home-link" target="_blank" rel="noopener noreferrer">
            Formulario de registro
          </a>.{" "}
          <Link href="/faq" className="home-link inline-flex items-center gap-1">
            <FaArrowRight /> Ver Preguntas Frecuentes
          </Link>
        </p>
      </header>

      {!artists.length ? <Loader /> : <ArtistGrid artists={shuffledArtists} />}
    </main>
  )
}
