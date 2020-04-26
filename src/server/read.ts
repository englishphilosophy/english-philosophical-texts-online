import {
  existsSync,
  readJsonSync,
  Author,
  Text
} from '../../deps.ts'

const dataDir = '../english-philosophical-texts/build'

export function authors (): Author[] {
  return (readJsonSync(`${dataDir}/index.json`) as any).texts as Author[]
}

export function author (id: string): Author|undefined {
  return authors().find((x: any) => x.id.toLowerCase() === id.toLowerCase())
}

export function text(id: string, type: 'texts'|'html'|'search' = 'texts'): Text|undefined {
  let path = `${dataDir}/${type}/${id.toLowerCase().replace(/\./g, '/')}.json`
  if (!existsSync(path)) {
    path = path.replace(/\.json$/, '/index.json')
  }
  return existsSync(path) ? readJsonSync(path) as Text : undefined
}

export function ancestors (id: string): Text[] {
  return id.split('.')
    .map((value, index, array) => array.slice(0, index + 1).join('.'))
    .map(id => text(id)) as Text[]
}
