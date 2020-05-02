import {
  Element,
  Author,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export function author (author: Author, section: 'Works'|'Usage'): Element {
  return new Element('div', { class: 'links', children: [
    new Element('a', {
      class: (section === 'Works') ? 'active' : undefined,
      href: misc.url(author),
      innerHTML: 'Works'
    }),
    new Element('a', {
      class: (section === 'Usage') ? 'active' : undefined,
      href: `${misc.url(author)}/usage`,
      innerHTML: 'Usage'
    })
  ] })
}

export function text (text: Text, section: 'Text'|'Usage'|'About'): Element {
  return new Element('div', { class: 'links', children: [
    new Element('a', {
      class: (section === 'Text') ? 'active' : undefined,
      href: misc.url(text),
      innerHTML: 'Text'
    }),
    new Element('a', {
      class: (section === 'Usage') ? 'active' : undefined,
      href: `${misc.url(text)}/usage`,
      innerHTML: 'Usage'
    }),
    new Element('a', {
      class: (section === 'About') ? 'active' : undefined,
      href: `${misc.url(text)}/about`,
      innerHTML: 'About'
    })
  ] })
}
