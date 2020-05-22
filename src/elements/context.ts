import {
  Element,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function context (prev?: Text, next?: Text): Element {
  const prevInnerHTML = prev ? `<a href="${misc.url(prev)}">&lt; ${prev.breadcrumb}</a>` : ''
  const nextInnerHTML = next ? `<a href="${misc.url(next)}">${next.breadcrumb} &gt;</a>` : ''
  return new Element('div', { class: 'context', children: [
    new Element('div', { class: 'prev', innerHTML: prevInnerHTML }),
    new Element('div', { class: 'next', innerHTML: nextInnerHTML })
  ] })
}
