import {
  Author,
  Element,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export function author (author: Author): Element {
  return new Element('div', { class: 'details', children: [
    new Element('h2', { innerHTML: `${misc.fullname(author)} (${author.birth}-${author.death})` }),
    new Element('h4', { innerHTML: `${author.nationality}, ${author.sex}` }),
  ] })
}

export function text (text: Text): Element {
  return new Element('div', { class: 'details', children: [
    new Element('h2', { innerHTML: 'First published' }),
    new Element('p', { innerHTML: text.published }),
    new Element('h2', { innerHTML: 'Copytext' }),
    new Element('p', { innerHTML: text.copytext }),
    new Element('h2', { innerHTML: 'Source' }),
    new Element('p', { innerHTML: text.sourceUrl || 'none' }),
    new Element('h2', { innerHTML: 'Comments' }),
    new Element('p', { innerHTML: text.sourceDesc })
  ] })
}
  