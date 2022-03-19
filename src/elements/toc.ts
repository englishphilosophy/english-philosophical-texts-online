import type { Element, Author, Text, TextStub } from '../../deps_client.ts'
import { element } from '../../deps_client.ts'
import * as misc from './misc.ts'

export default (text: Author | Text): Element => {
  return element('ul', { class: 'section-content toc', children: text.texts.map(tocEntry) })
}

const tocEntry = (textStub: TextStub): Element => {
  return element('li', { innerHTML: textStub.imported ? misc.link(textStub) : misc.title(textStub) })
}
