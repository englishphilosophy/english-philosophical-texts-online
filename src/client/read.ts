import {
  Analysis,
  Author,
  Text
} from '../../deps_client.ts'

export async function authors (): Promise<Author[]> {
  const response = await window.fetch('/data/index.json')
  const library = await response.json()
  return library.texts.map((x: any) => new Author(x))
}

export async function author (id: string): Promise<Author|undefined> {
  const response = await window.fetch('/data/index.json')
  const library = await response.json()
  const author = library.texts.find((x: any) => x.id.toLowerCase() === id.toLowerCase())
  return author ? new Author(author) : undefined
}

export async function text (id: string): Promise<Text|undefined> {
  const response = await window.fetch(`/data/html/${id.toLowerCase().replace(/\./g, '/')}.json`)
  return response.ok ? new Text(await response.json()) : undefined
}

export async function analysis (id: string): Promise<Analysis|undefined> {
  const response = await window.fetch(`/data/analysis/${id.toLowerCase().replace(/\./g, '/')}.json`)
  return response.ok ? await response.json() : undefined
}
