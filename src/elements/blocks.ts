import type { Element, Block } from '../../deps_client.ts'
import { element } from '../../deps_client.ts'
import * as misc from './misc.ts'

/** Maps an array of blocks (i.e. paragraphs or footnotes) to HTML display. */
export default function blocks (blocks: Block[]): Element {
  return element('div', { class: 'section-content blocks', children: blocks.map(block) })
}

/** Maps a block to its HTML display. */
function block (block: Block): Element {
  return element('div', { class: 'block', id: block.id.split('.').pop(), children: [
    element('div', { class: 'id', innerHTML: misc.link(block) }),
    content(block)
  ] })
}

/** Maps the content of a block to its HTML display. */
function content (block: Block): Element {
  const innerHTML = block.speaker
    ? `<i>${block.speaker}</i>. ${block.content}`
    : block.content
  return element('div', { class: 'content', innerHTML })
}
