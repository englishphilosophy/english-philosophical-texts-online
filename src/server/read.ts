import {
  existsSync,
  readJsonSync
} from '../../deps.ts'
import Author from '../data/author.ts'
import Text from '../data/text.ts'

const dataDir = '../english-philosophical-texts/build/texts'

export function authors (): Author[] {
  const data = readJsonSync(`${dataDir}/index.json`) as any
  return data.texts.map((x: any) => new Author(x))
}

export function author (id: string): Author|null {
  const data = readJsonSync(`${dataDir}/index.json`) as any
  const author = data.texts.find((x: any) => x.id.toLowerCase() === id.toLowerCase())
  return author ? new Author(author) : null
}

export function text(id: string): Text|null {
  const path1 = `${dataDir}/${id.toLowerCase().replace(/\./, '/')}.json`
  const path2 = path1.replace(/\.json$/, '/index.json')
  if (existsSync(path1)) {
    return new Text(readJsonSync(path1))
  }
  if (existsSync(path2)) {
    return new Text(readJsonSync(path2))
  }
  return null
}
