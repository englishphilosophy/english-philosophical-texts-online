import {
  Element,
  Block
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function blocks (blocks: Block[]): Element {
  return new Element('div', { class: 'section-content blocks', children: blocks.map(block) })
}

function block (block: Block): Element {
  return new Element('div', { class: 'block', id: block.id.split('.').pop(), children: [
    new Element('div', { class: 'id', innerHTML: misc.link(block) }),
    content(block)
  ] })
}

function content (block: Block): Element {
  const innerHTML = block.speaker
    ? `<i>${block.speaker}</i>. ${block.content}`
    : block.content
  return new Element('div', { class: 'content', innerHTML })
}
