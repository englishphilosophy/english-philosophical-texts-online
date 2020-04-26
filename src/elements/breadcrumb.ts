import {
  Element,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function breadcrumb (ancestors: Text[]): Element {
  return new Element('nav', { class: 'breadcrumb', children: ancestors.map(crumb) })
}

function crumb (text: Text): Element {
  return new Element('div', { children: [
    new Element('a', { href: misc.url(text), innerHTML: text.breadcrumb || text.id })
  ] })
}
  