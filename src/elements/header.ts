import {
  Element
} from '../../deps_client.ts'

export default function header (section: string): Element {
  return new Element('header', { class: 'header', children: [
    new Element('div', { class: 'title', children: [
      new Element('h1', { innerHTML: 'English Philosophical Texts Online' }),
      new Element('h2', { innerHTML: 'An online library of early modern English-language philosophical texts' })
    ] }),
    new Element('nav', { class: 'links', children: [
      sectionLink('/', 'Texts', section),
      sectionLink('/research', 'Research', section),
      sectionLink('/about', 'About', section)
    ] })
  ] })
}

function sectionLink (href: string, innerHTML: string, section: string): Element {
  const _class = (section === innerHTML) ? 'active' : undefined
  return new Element('a', { class: _class, href, innerHTML })
}
