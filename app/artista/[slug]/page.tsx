import { ArtistImage } from "@/components/ArtistImage";
import { BackBtn } from "@/components/BackBtn";
import { getArtists } from "@/lib/sheets";
import { Artist } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artists = await getArtists();
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) return notFound();

  return (
    <main className="px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-2xl">
          <ArtistImage
            src={artist.foto_url}
            alt={artist.nombre}
            nombre={artist.nombre}
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-semibold">{artist.nombre}</h1>

          <p className="text-neutral-500 mt-1">{artist.pronombres}</p>

          <p className="mt-6">{artist.presentacion}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {artist.disciplinas.map((d: string) => (
              <Link
                key={d}
                href={`/?disciplina=${d}`}
                className="text-xs border px-2 py-1 rounded-full hover:bg-white/50 transition cursor-pointer"
              >
                {d}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {artist.links.map((link: string, index: number) => (
              <a
                key={`link-${index}`}
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
  );
}

export async function generateStaticParams() {
  const artists: Artist[] = await getArtists();
  return artists.map((a) => ({ slug: a.slug }));
}