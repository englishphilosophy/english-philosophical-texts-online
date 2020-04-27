import {
  Element
} from '../../deps_client.ts'

export default function reader(title: Element[], content: Element[]): Element {
  return new Element('div', { class: 'reader', children: [
    new Element('div', { children: [
      new Element('div', { class: 'title', children: title })
    ] }),
    new Element('div', { children: [
      new Element('div', { class: 'content', children: content })
    ] })
  ] })
}
