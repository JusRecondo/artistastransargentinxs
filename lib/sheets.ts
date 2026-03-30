import { Artist } from "./types"
import { slugify, transformImageUrl } from "./utils"

const SHEET_ID = process.env.NEXT_PUBLIC_ARTISTS_SPREADSHEET_ID

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`

function cleanValue(value: any) {
  if (value === null || value === undefined) return null

  if (typeof value === "string") {
    const trimmed = value.trim()

    if (
      trimmed === "" ||
      trimmed === "#REF!" ||
      trimmed === "#ERROR!"
    ) {
      return null
    }

    return trimmed
  }

  return value
}

function isValidArtist(a: Artist) {
  const hasValidId =
    typeof a.id === "string" &&
    a.id.length > 0 &&
    !a.id.includes("#")

  const hasNombre =
    typeof a.nombre === "string" &&
    a.nombre.trim().length > 0

  const hasFoto =
    typeof a.foto_url === "string" &&
    a.foto_url.startsWith("http")

  return hasValidId && hasNombre && hasFoto
}

export async function getArtists(): Promise<Artist[]> {
  const res = await fetch(SHEET_URL, { cache: "no-store" })
  const text = await res.text()
  const json = JSON.parse(text.substring(47).slice(0, -2))
  const rows = json.table.rows
  
  const artists: Artist[] = rows.map((row: any) => {
    const c = row.c || []
    
    const id = cleanValue(c[11]?.v)
    const nombre = cleanValue(c[1]?.v)
    const pronombres = cleanValue(c[2]?.v)
    const foto = cleanValue(c[3]?.v)
    const presentacion = cleanValue(c[4]?.v)
    const disciplinasRaw = cleanValue(c[5]?.v)
    const link1 = cleanValue(c[6]?.v)
    const link2 = cleanValue(c[7]?.v)
    const link3 = cleanValue(c[8]?.v)
    const ubicacion = cleanValue(c[9]?.v)
    const visibleRaw = cleanValue(c[10]?.v)

    return {
      id: id || "",

      slug: nombre ? slugify(nombre) : "",

      nombre: nombre || "",
      pronombres: pronombres || "",
      foto_url: transformImageUrl(foto || ""),

      presentacion: presentacion || "",

      disciplinas: disciplinasRaw
        ? disciplinasRaw.split(",").map((d: string) => d.trim())
        : [],

      links: [link1, link2, link3].filter(Boolean) as string[],

      ubicacion: ubicacion || "",

      visible:
        visibleRaw === true ||
        visibleRaw === "TRUE" ||
        visibleRaw === "true",
    }
  })

  const validArtists = artists.filter(
    (a) => isValidArtist(a) && a.visible
  )

  return validArtists
}

export async function getArtistBySlug(slug: string) {
  const artists = await getArtists()
  return artists.find((a) => a.slug === slug)
}