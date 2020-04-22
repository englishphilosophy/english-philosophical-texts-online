import {
  Element,
  HtmlResponse
} from '../../deps.ts'
import base from './base.ts'

export default class Page extends HtmlResponse {
  constructor (section: string, children: Element[]) {
    const body = new Element('html', {
      lang: 'en',
      children: [new Head(), new Body(section, children)]
    })
    super(body)
  }
}

class Head extends Element {
  constructor (title: string|null = null) {
    title = title
      ? `${title} - English Philosophical Texts Online`
      : 'English Philosophical Texts Online'

    super('head', { children: [
      new Element('meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }),
      new Element('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }),
      new Element('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      new Element('meta', { name: 'keywords', content: 'english, philosophy, texts, hobbes, locke, hume, mill, shaftesbury' }),
      new Element('meta', { name: 'description', content: 'High-quality digital editions of a broad canon of English philosophical texts published between 1650 and 1830.' }),
      new Element('title', { innerHTML: title }),
      new Element('style', { type: 'text/css', innerHTML: base }),
      new Element('link', { rel: 'shortcut icon', href: '/images/favicon.ico' }),
      // new Element('script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-23731986-3' }),
      // new Element('script', { innerHTML: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'UA-23731986-3\');' })
    ]})
  }
}

class Body extends Element {
  constructor  (section: string, children: Element[]) {
    super('body', {
      children: [
        new Header(),
        new Nav(section),
        new Main(children)
      ]
    })
  }
}

class Header extends Element {
  constructor  () {
    super('header', { innerHTML: 'English Philosophical Texts Online' })
  }
}

class Nav extends Element {
  constructor (section: string) {
    super('nav', { children: [
      new Element('section', {
        children: [
          new SectionLink('/', 'Texts', section),
          new SectionLink('/search', 'Search', section),
          new SectionLink('/compare', 'Compare', section),
          new SectionLink('/about', 'About', section)
        ]
      })
    ] })
  }
}

class SectionLink extends Element {
  constructor (href: string, innerHTML: string, section: string) {
    super('a', {
      class: (section === innerHTML) ? 'active' : undefined,
      href,
      innerHTML
    })
  }
}

class Main extends Element {
  constructor  (children: Element[]) {
    super('main', { children: [
      new Element('section', { children })
    ] })
  }
}
