import {
  Author,
  Element,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export function author (author: Author): Element {
  return new Element('div', { class: 'section-content about', children: [
    new Element('h2', { innerHTML: `${misc.fullname(author)} (${author.birth}-${author.death})` }),
    new Element('h4', { innerHTML: `${author.nationality}, ${author.sex}` }),
  ] })
}

export function text (text: Text): Element {
  const children = [
    new Element('p', { innerHTML: text.sourceDesc }),
    new Element('h4', { innerHTML: 'First published' }),
    new Element('p', { innerHTML: text.published.map(x => x.toString(10)).join(', ') }),
    new Element('h4', { innerHTML: 'Copytext' }),
    new Element('p', { innerHTML: text.copytext.map(x => x.toString(10)).join(', ') })
  ]
  if (text.sourceUrl) {
    children.push(new Element('h4', { innerHTML: 'Source' }))
    children.push(new Element('p', { children: [new Element('a', { href: text.sourceUrl, innerHTML: text.sourceUrl })] }))
  }
  return new Element('div', { class: 'section-content about', children })
}
