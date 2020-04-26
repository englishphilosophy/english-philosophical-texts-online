import {
  Element
} from '../../deps_client.ts'
  
export default function nav (children: Element[]): Element {
  return new Element('nav', { class: 'nav', children })
}
