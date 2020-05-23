import {
  Element,
  Author,
  Text
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function breadcrumb (ancestors: (Author|Text)[], prev?: Text, next?: Text): Element {
  return new Element('nav', { class: 'breadcrumb', children: [
    trail(ancestors),
    context(prev, next)
  ] })
}

function trail (ancestors: (Author|Text)[]): Element {
  return new Element('div', { class: 'trail', children: ancestors.map(crumb) })
}

function crumb (data: Author|Text): Element {
  const innerHTML = (data as Text).breadcrumb || data.id
  return new Element('div', { class: 'crumb', children: [
    new Element('a', { href: misc.url(data), innerHTML })
  ] })
}

function context (prev?: Text, next?: Text): Element {
  const prevInnerHTML = prev ? `<a href="${misc.url(prev)}">&lt; ${prev.breadcrumb}</a>` : ''
  const nextInnerHTML = next ? `<a href="${misc.url(next)}">${next.breadcrumb} &gt;</a>` : ''
  return new Element('div', { class: 'context', children: [
    new Element('div', { class: 'prev', innerHTML: prevInnerHTML }),
    new Element('div', { class: 'next', innerHTML: nextInnerHTML })
  ] })
}
