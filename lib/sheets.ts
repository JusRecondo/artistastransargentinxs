const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1te0NmnNwIDceGfjWRSSxKkoJZW3C3fkU-3K7KGd_Q64/gviz/tq?tqx=out:json"

export async function getArtists() {
  const res = await fetch(SHEET_URL, { cache: "no-store" })
  const text = await res.text()

  const json = JSON.parse(text.substring(47).slice(0, -2))
  const rows = json.table.rows

  const artists = rows.map((row: any, index: number) => {
    const c = row.c

    return {
      id: String(index),
      nombre: c[1]?.v || "",
      pronombres: c[2]?.v || "",
      foto_url: c[3]?.v || "",
      presentacion: c[4]?.v || "",
      disciplinas: c[5]?.v?.split(",") || [],
      links: [c[6]?.v, c[7]?.v, c[8]?.v].filter(Boolean),
      visible: c[9]?.v === "TRUE",
    }
  })

  return artists
}