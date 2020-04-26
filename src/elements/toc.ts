import {
  Author,
  Element,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function toc (text: Author|Text): Element {
  return new Element('ul', { class: 'toc', children: text.texts.map(tocEntry) })
}

function tocEntry (text: Text): Element {
  return text.imported
    ? new Element('li', { innerHTML: misc.textLink(text) })
    : new Element('li', { innerHTML: misc.textTitle(text) })
}
