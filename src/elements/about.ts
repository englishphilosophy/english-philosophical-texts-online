import type { Author, Element, Text } from '../../deps_client.ts'
import { element } from '../../deps_client.ts'
import * as misc from './misc.ts'

/** Maps an author to HTML summary information. */
export function author (author: Author): Element {
  return element('div', { class: 'section-content about', children: [
    element('h2', { innerHTML: `${misc.fullname(author)} (${author.birth}-${author.death})` }),
    element('h4', { innerHTML: `${author.nationality}, ${author.sex}` }),
  ] })
}

/** Maps a text to HTML summary information. */
export function text (text: Text): Element {
  const children = [
    element('p', { innerHTML: text.sourceDesc }),
    element('h4', { innerHTML: 'First published' }),
    element('p', { innerHTML: text.published.map(x => x.toString(10)).join(', ') }),
    element('h4', { innerHTML: 'Copytext' }),
    element('p', { innerHTML: text.copytext.map(x => x.toString(10)).join(', ') })
  ]
  if (text.sourceUrl) {
    children.push(element('h4', { innerHTML: 'Source' }))
    children.push(element('p', { children: [element('a', { href: text.sourceUrl, innerHTML: text.sourceUrl })] }))
  }
  return element('div', { class: 'section-content about', children })
}
