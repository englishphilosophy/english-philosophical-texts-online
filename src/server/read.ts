import {
  Analysis,
  Author,
  FlatLexicon,
  Lexicon,
  ReducedLexicon,
  Text
} from '../../deps.ts'

export const lexicon = async (): Promise<Lexicon> => {
  return JSON.parse(await fetchData('lexicon')) as Lexicon
}

export const flatLexicon = async (): Promise<FlatLexicon> => {
  return JSON.parse(await fetchData('lexicon-flat')) as FlatLexicon
}

export const reducedLexicon = async (): Promise<ReducedLexicon> => {
  return JSON.parse(await fetchData('lexicon-reduced')) as ReducedLexicon
}

export const authors = async (): Promise<Author[]> => {
  return JSON.parse(await fetchData('authors')).texts as Author[]
}

export const author = async (id: string): Promise<Author | undefined> => {
  const sanitizedId = id.toLowerCase().replaceAll('.', '')
  try {
    return JSON.parse(await fetchData(`text/${sanitizedId}`)) as Author
  } catch {
    return undefined
  }
}

export const text = async (id: string, type: 'html' | 'text' = 'html'): Promise<Text | undefined> => {
  try {
    return JSON.parse(await fetchData(`${type}/${id.toLowerCase().replaceAll('.', '/')}`)) as Text
  } catch {
    return undefined
  }
}

export const analysis = async (id: string): Promise<Analysis | undefined> => {
  try {
    return JSON.parse(await fetchData(`analysis/${id.toLowerCase().replaceAll('.', '/')}`)) as Analysis
  } catch {
    return undefined
  }
}

const fetchData = async (path: string): Promise<string> => {
  const request = new Request(`${dataUrl}/${path}`)
  const response = await fetch(request)
  return await response.text()
}

const dataUrl = 'https://ept.deno.dev'
