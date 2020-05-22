import {
  existsSync,
  readJsonSync,
  readFileStrSync,
  parseYaml,
  Author,
  Text,
  Analysis
} from '../../deps.ts'

/** The path to the data directory (relative to the main process). */
const dataDir = '../english-philosophical-texts/build'

/** Returns the raw lexicon as an object. */
export function lexicon (): any {
  return parseYaml(readFileStrSync('../english-philosophical-texts/lexicon.yml'))
}

/** Returns a map of words to lemmas (derived from the lexicon).
 * 
 * This is not currently used by anything, but might be useful at some point ??
 */
export function flatLexicon (): any {
  const lex = lexicon()
  const flat: any = {}
  for (const lemma in lex) {
    for (const word of lex[lemma]) {
      flat[word] = lemma
    }
  }
  return flat
}

/** Returns an array of arrays of words (grouped by lemma).
 * 
 * This is used by the search function (if the variantSpellings option is ON).
 */
export function reducedLexicon (): Array<Array<string>> {
  const lex = lexicon()
  const reduced = []
  for (const lemma in lex) {
    const words = lex[lemma] as string[]
    if (words.length > 0) {
      words.unshift(lemma)
      reduced.push(words)
    }
  }
  return reduced
}

/* Returns an array of all authors. */
export function authors (): Author[] {
  const data = readJsonSync(`${dataDir}/index.json`) as any
  return data.texts.map((x: any) => new Author(x))
}

/* Looks up an author by ID. */
export function author (id: string): Author|undefined {
  const data = readJsonSync(`${dataDir}/index.json`) as any
  const author = data.texts.find((x: any) => x.id.toLowerCase() === id.toLowerCase())
  return author ? new Author(author) : undefined
}

/** Looks up a text by ID.
 *
 * This also returns an author as a text object. This is exploited by the
 * `ancestors` function below. (Should I change this??)
 */
export function text (id: string, type: 'texts'|'html'|'search'|'analysis' = 'texts'): Text|undefined {
  let path = `${dataDir}/${type}/${id.toLowerCase().replace(/\./g, '/')}.json`
  if (!existsSync(path)) {
    path = path.replace(/\.json$/, '/index.json')
  }
  return existsSync(path) ? new Text(readJsonSync(path)) : undefined
}

/** Returns an array of a text's ancestors, given its ID.
 * 
 * If the ID is malformed, some of the elements of the array could be
 * undefined. As long as I keep checking the data, this shouldn't be a problem.
 * But perhaps I should rethink this?
 */
export function ancestors (id: string): Text[] {
  return id.split('.')
    .map((value, index, array) => array.slice(0, index + 1).join('.'))
    .map(id => text(id)) as Text[]
}

/** Returns the next section (or whatever) of a text. */
export function next (id: string, down: boolean = true): Text|undefined {
  const t = text(id)
  if (t) {
    if (t.texts && t.texts.length > 0 && down) {
      return t.texts[0]
    }
    if (t.parent) {
      const parent = text(t.parent)
      if (parent) {
        const index = parent.texts.findIndex(x => x.id === t.id)
        if (index < parent.texts.length - 1) {
          return parent.texts[index + 1]
        }
        if (parent.parent) {
          return next(parent.id, false)
        }
      }
    }
  }
}

/** Returns the previous section (or whatever) of a text. */
export function previous (id: string): Text|undefined {
  const t = text(id)
  if (t && t.parent) {
    const parent = text(t.parent)
    if (parent) {
      const index = parent.texts.findIndex(x => x.id === t.id)
      if (index === 0) {
        return parent
      }
      return lastDescendant(parent.texts[index - 1])
    }
  }
}

/** Returns the last descendant of a collection. */
function lastDescendant (t: Text): Text|undefined {
  if (t.texts.length > 0) {
    const last = t.texts.pop()
    if (last) {
      return lastDescendant(last)
    }
  }
  return t
}

/** Looks up an analysis by ID. */
export function analysis (id: string): Analysis|undefined {
  let path = `${dataDir}/analysis/${id.toLowerCase().replace(/\./g, '/')}.json`
  if (!existsSync(path)) {
    path = path.replace(/\.json$/, '/index.json')
  }
  return existsSync(path) ? readJsonSync(path) as Analysis : undefined
}
