import Author from '../data/author.ts'

export async function authors (): Promise<Author[]> {
  const response = await window.fetch('/data/index.json')
  const library = await response.json()
  return library.texts.map((x: any) => new Author(x))
}

export async function author (id: string): Promise<Author|null> {
  const response = await window.fetch('/data/index.json')
  const library = await response.json()
  const author = library.texts.find((x: any) => x.id.toLowerCase() === id.toLowerCase())
  return author ? new Author(author) : null
}
