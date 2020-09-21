import type { Element, Author, Text } from '../../deps_client.ts'
import { element } from '../../deps_client.ts'
import * as misc from './misc.ts'

/** Maps ancestors and adjacent texts to an HTML breadcrumb display. */
export default function breadcrumb (ancestors: (Author|Text)[], prev?: Text, next?: Text): Element {
  return element('nav', { class: 'breadcrumb', children: [
    trail(ancestors),
    context(prev, next)
  ] })
}

/** Maps ancestors of a text to an HTML breadcrumb display. */
function trail (ancestors: (Author|Text)[]): Element {
  return element('div', { class: 'trail', children: ancestors.map(crumb) })
}

/** Maps an ancestor of a text to an HTML breadcrumb link. */
function crumb (data: Author|Text): Element {
  const innerHTML = (data as Text).breadcrumb || data.id
  return element('div', { class: 'crumb', children: [
    element('a', { href: misc.url(data), innerHTML })
  ] })
}

/** Maps adjacent texts to a previous/next HTML display. */
function context (prev?: Text, next?: Text): Element {
  const prevInnerHTML = prev ? `<a href="${misc.url(prev)}">&lt; ${prev.breadcrumb}</a>` : ''
  const nextInnerHTML = next ? `<a href="${misc.url(next)}">${next.breadcrumb} &gt;</a>` : ''
  return element('div', { class: 'context', children: [
    element('div', { class: 'prev', innerHTML: prevInnerHTML }),
    element('div', { class: 'next', innerHTML: nextInnerHTML })
  ] })
}
