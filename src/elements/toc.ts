import {
  Author,
  Element,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function toc (text: Author|Text): Element {
  return new Element('ul', { class: 'section-content toc', children: text.texts.map(tocEntry) })
}

function tocEntry (text: Text): Element {
  return new Element('li', { innerHTML: text.imported ? misc.link(text) : misc.title(text) })
}
