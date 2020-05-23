import {
  Element
} from '../../deps_client.ts'

type Page = {
  id: string
  title: string
  url: string
}

export default function info (pageId: string, pages: Page[], content: Element): Element {
  return new Element('div', { class: 'info', children: [
    new Element('select', {
      disabled: true,
      class: 'submenu',
      'aria-label': 'Page',
      children: pages.map(x => option(x, pageId))
    }),
    content,
    new Element('nav', {
      class: 'submenu',
      children: [new Element('div', { children: pages.map(x => link(x, pageId)) })]
    })
  ] })
}

function option (page: Page, pageId: string): Element {
  const selected = page.id === pageId
  return new Element('option', {
    selected: selected ? 'selected' : undefined,
    value: page.url,
    innerHTML: page.title
  })
}

function link (page: Page, pageId: string): Element {
  const active = page.id === pageId
  return new Element('a', {
    class: active ? 'active': undefined,
    href: page.url,
    innerHTML: page.title
  })
}
