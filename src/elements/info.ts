import type { Element } from '../../deps_client.ts'
import type { PageDetails } from '../types/page_details.ts'
import { element } from '../../deps_client.ts'

/** Create HTML content for an info page (i.e. a research or about page). */
export default (pageId: string, pages: PageDetails[], content: Element): Element => {
  return element('div', { class: 'info', children: [
    element('select', {
      disabled: true,
      class: 'submenu',
      'aria-label': 'Page',
      children: pages.map(x => option(x, pageId))
    }),
    content,
    element('nav', {
      class: 'submenu',
      children: [element('div', { children: pages.map(x => link(x, pageId)) })]
    })
  ] })
}

/** Creates an option element for a navigation select menu. */
const option = (page: PageDetails, pageId: string): Element => {
  const selected = page.id === pageId
  return element('option', {
    selected: selected ? 'selected' : undefined,
    value: page.url,
    innerHTML: page.title
  })
}

/** Creates a link for a navigation list. */
const link = (page: PageDetails, pageId: string): Element => {
  const active = page.id === pageId
  return element('a', {
    class: active ? 'active': undefined,
    href: page.url,
    innerHTML: page.title
  })
}
