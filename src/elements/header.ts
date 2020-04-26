import {
  Element
} from '../../deps_client.ts'

export default function header (section: string): Element {
  return new Element('header', { class: 'header', children: [
    new Element('div', { children: [
      new Element('h1', { innerHTML: 'English Philosophical Texts Online' }),
      new Element('button', { innerHTML: '<svg width="24" height="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>' })
    ] }),
    new Element('nav', { children: [
      sectionLink('/', 'Texts', section),
      sectionLink('/search', 'Search', section),
      sectionLink('/compare', 'Compare', section),
      sectionLink('/about', 'About', section)
    ] })
  ] })
}

function sectionLink (href: string, innerHTML: string, section: string): Element {
  const _class = (section === innerHTML) ? 'active' : undefined
  return new Element('a', { class: _class, href, innerHTML })
}
