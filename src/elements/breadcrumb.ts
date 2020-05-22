import {
  Element,
  Author,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function breadcrumb (ancestors: (Author|Text)[]): Element {
  return new Element('nav', { class: 'breadcrumb', children: ancestors.map(crumb) })
}

function crumb (data: Author|Text): Element {
  const innerHTML = (data as Text).breadcrumb || data.id
  return new Element('div', { children: [
    new Element('a', { href: misc.url(data), innerHTML })
  ] })
}
