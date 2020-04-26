import {
  Element
} from '../../deps_client.ts'

export default function main (children: Element[]): Element {
  return new Element('main', { class: 'main', children })
}
