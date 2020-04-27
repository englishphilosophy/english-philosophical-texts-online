import {
  Element,
  Author,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function links(data: Author|Text, section: string): Element {
  return new Element('div', { class: 'links', children: [
    new Element('a', { href: misc.url(data), innerHTML: 'Text' }),
    new Element('a', { href: `${misc.url(data)}/usage`, innerHTML: 'Usage' }),
    new Element('a', { href: `${misc.url(data)}/about`, innerHTML: 'About' })
  ] })
}
