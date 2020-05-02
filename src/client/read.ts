import {
  Analysis,
  Author
} from '../../deps_client.ts'

export async function authors (): Promise<Author[]> {
  const response = await window.fetch('/data/index.json')
  const library = await response.json()
  return library.texts
}

export async function author (id: string): Promise<Author|undefined> {
  const response = await window.fetch('/data/index.json')
  const library = await response.json()
  return library.texts.find((x: Author) => x.id.toLowerCase() === id.toLowerCase())
}

export async function analysis (id: string): Promise<Analysis|undefined> {
  const response = await window.fetch(`/data/analysis/${id.toLowerCase().replace(/\./g, '/')}.json`)
  return response.ok ? await response.json() : undefined
}
