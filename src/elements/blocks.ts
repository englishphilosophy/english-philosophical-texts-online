import {
  Element,
  Text,
  Block
} from '../../deps_client.ts'

export default function blocks (blocks: Block[]): Element {
  return new Element('div', { class: 'blocks', children: blocks.map(block) })
}

function block (block: Block): Element {
  const id = block.id ? block.id.split('.').pop() : undefined

  return new Element('div', { class: 'block', id, children: [
    new Element('div', { class: 'id', innerHTML: block.id }),
    new Element('div', { class: 'content', innerHTML: block.content })
  ] })
}
  