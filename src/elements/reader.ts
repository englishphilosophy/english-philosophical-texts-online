import {
  Element,
  Text
} from '../../deps_client.ts'

import blocks from '../elements/blocks.ts'
import toc from '../elements/toc.ts'

export default function reader(text: Text): Element {
  return new Element('div', { class: 'reader', children: [blocks(text.blocks.slice(0, 1)), content(text)] })
}

function content (text: Text): Element {
  return (text.texts.length) ? toc(text) : blocks(text.blocks.slice(1)) 
}
