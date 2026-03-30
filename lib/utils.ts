export function shuffle(array: any[]) {
  let currentIndex = array.length

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export function transformImageUrl(url: string) {
  if (!url) return ""

  const match = url.match(/\/d\/(.*?)\//)
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`
  }

  return url
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}