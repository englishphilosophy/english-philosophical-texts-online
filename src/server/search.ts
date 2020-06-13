// BUG: with ignorePuncuation OFF and wholeWords ON, search does not match
// queries with punctuation in the right place

import {
  Block,
  Text
} from '../../deps.ts'

import { Query } from '../types/query.ts'
import { SearchOptions } from '../types/search_options.ts'
import { Result } from '../types/result.ts'
import * as read from './read.ts'

/** Generates a search query object from form parameters. */
export function parseQuery (query1: Query|null, query2: Query|null, operator: string|null): Query|null {
  if (!query1) {
    return null
  }
  if (!query2) {
    return query1
  }
  switch (operator) {
    case 'and': // fallthrough
    case 'or': // fallthrough
    case 'bot':
      return { query1, query2, operator }

    default:
      return null
  }
}

/** Gets blocks from the texts with the given IDs that match the search query.
 * 
 * The `author` argument should not be given explicitly; it is used internally
 * by the recursion to filter out subtexts by a different author from the author
 * of the text being searched.
 */
export function runQuery (ids: string[], query: Query, options: SearchOptions, author: string|null = null): Result[] {
  const results = []
  const lexicon = options.variantSpellings ? read.reducedLexicon() : {}
  for (const id of ids) {
    const text = read.text(id, 'search')
    if (text) {
      const isAuthor = (text.id.split('.').length === 1)
      const isDifferentAuthor = author && (text.id.indexOf(author) !== 0)
      if ((text.imported || isAuthor) && !isDifferentAuthor) {
        results.push(matches(text, query, options, lexicon))
      }
    }
  }
  return results.filter(result => result.total > 0)
}

/** Gets search matches from a text (recursively calling runQuery on sub-texts). */
function matches (text: Text, query: Query, options: SearchOptions, lexicon: any): Result {
  // initialise the result object
  const result: Result = {
    id: text.id,
    title: text.title,
    blocks: [],
    results: [],
    total: 0 // this total includes matches in sub texts
  }

  // either search subtexts recursively for matches
  if (text.texts.length > 0) {
    result.results = runQuery(text.texts.map(x => x.id), query, options, text.id.split('.')[0])
    for (const subResult of result.results) {
      result.total += subResult.total
    }
  }

  // or search the paragraphs and notes of this text
  for (const block of text.blocks) {
    if (hit(block.content, query, options, lexicon)) {
      result.blocks.push(matchedBlock(block, query, options, lexicon))
    }
  }
  result.total += result.blocks.length

  // return the result
  return result
}

/** Creates a matched block for display, with search matches highlighted. */
function matchedBlock (block: Block, query: Query, options: SearchOptions, lexicon: any): Block {
  block.content = block.content.replace(regex(query, options, lexicon), '<mark>$1</mark>')
  return block
}

/** Determines whether some content contains a match for a search query. */
function hit (content: string, query: Query, options: SearchOptions, lexicon: any): boolean {
  // match string queries directly
  if (typeof query === 'string') {
    return (content.match(regex(query, options, lexicon)) !== null)
  }

  // otherwise break down the query recursively
  switch (query.operator) {
    case 'and':
      return hit(content, query.query1, options, lexicon) && hit(content, query.query2, options, lexicon)

    case 'or':
      return hit(content, query.query1, options, lexicon) || hit(content, query.query2, options, lexicon)

    case 'bot': // "but not"
      return hit(content, query.query1, options, lexicon) && !hit(content, query.query2, options, lexicon)
  }
}

/** Creates a regular expression from a search query. */
function regex (query: Query, options: SearchOptions, lexicon: any): RegExp {
  return new RegExp(`(${regexString(query, options, lexicon)})`, 'gi')
}

/** Creates the string for a regular expression from the search query. */
function regexString (query: Query, options: SearchOptions, lexicon: any): string {
  if (typeof query === 'string') {
    if (options.ignorePunctuation) {
      query = query.replace(/[.,:;?!()]/g, '')
    }

    let words = query.split(' ')

    if (options.variantSpellings) {
      words = words.map((word) => {
        const group = lexicon.find((x: any) => x.includes(word))
        return group ? `(${group.join('|')})` : word
      })
    }

    if (options.wholeWords) {
      words = words.map(word => `\\b${word}\\b`)
    }

    if (options.ignorePunctuation) {
      words = words.map(word => `\\(?${word}[.,;?!)]?`)
    }

    return words.join(' ')
  }

  switch (query.operator) {
    case 'and': // fallthrough
    case 'or':
      return `${regexString(query.query1, options, lexicon)}|${regexString(query.query2, options, lexicon)}`

    case 'bot': // "but not"
      return regexString(query.query1, options, lexicon)
  }
}
