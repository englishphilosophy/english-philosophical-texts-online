import {
  Element,
  HtmlResponse
} from '../../deps.ts'

import css from './css.ts'

/** Page options. */
type Options = {
  title?: string
  section: 'Texts'|'Research'|'About'|'Error'
  bodyClass?: string
  nav?: Element[]
  main: Element[]
}

/** Generates an HTML response with the given options. */
export default class Page extends HtmlResponse {
  constructor (options: Options) {
    const content = new Element('html', {
      lang: 'en',
      children: [head(options), body(options)]
    })
    super(content)
  }
}

/** Generate the head element. */
function head (options: Options): Element {
  const title = options.title
    ? `${options.title} - English Philosophical Texts Online`
    : 'English Philosophical Texts Online'
  
  return new Element('head', { children: [
    new Element('meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }),
    new Element('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }),
    new Element('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
    new Element('meta', { name: 'keywords', content: 'english, philosophy, texts, hobbes, locke, hume, mill, shaftesbury' }),
    new Element('meta', { name: 'description', content: 'High-quality digital editions of a broad canon of English philosophical texts published between 1650 and 1830.' }),
    new Element('title', { innerHTML: title }),
    new Element('style', { type: 'text/css', innerHTML: css }),
    new Element('link', { rel: 'shortcut icon', href: '/favicon.ico' }),
    new Element('script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-23731986-3' }),
    new Element('script', { innerHTML: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'UA-23731986-3\');' }),
    new Element('script', { defer: true, module: true, src: '/js/client/app.js' })
  ]})
}

/** Generates the body element. */
function body (options: Options): Element {
  return new Element('body', { class: options.bodyClass, children: [
    header(options.section),
    nav(options.nav || []),
    main(options.main),
    footer
  ] })
}

/** Generates the header element. */
function header (section: string): Element {
  return new Element('header', { children: [
    new Element('hgroup', { children: [
      new Element('h1', { innerHTML: 'English Philosophical Texts Online' }),
      new Element('h2', { innerHTML: 'A free online library of early modern English-language philosophical texts' })
    ] }),
    new Element('nav', { children: [
      sectionLink('/', 'Texts', section),
      sectionLink('/research', 'Research', section),
      sectionLink('/about', 'About', section)
    ] })
  ] })
}

function sectionLink (href: string, innerHTML: string, section: string): Element {
  const _class = (section === innerHTML) ? 'active' : undefined
  return new Element('a', { class: _class, href, innerHTML })
}

/** Generates the nav element. */
function nav (children: Element[]): Element {
  return new Element('nav', { children })
}

/** Generates the main element. */
function main (children: Element[]): Element {
  return new Element('main', { children: [
    new Element('section', { children })
  ] })
}

/** The footer element. */
const footer = new Element('footer', { children: [
  new Element('section', { children: [
    new Element('p', { innerHTML: 'English Philosophical Texts Online is developed and maintained by <a href="https://merivale.uk">Amyas Merivale</a>, as part of a project run by <a href="">Amyas Merivale</a> and <a href="http://www.millican.org">Peter Millican</a> at the <a href="https://www.philosophy.ox.ac.uk">University of Oxford</a>. All comments and suggestions are welcome.' }),
    new Element('ul', { children: [
      new Element('li', { children: [
        new Element('a', { href: 'https://englishphilosophy.org', innerHTML: 'English Philosophical Texts Online' })
      ] }),
      new Element('li', { children: [
        new Element('a', { href: 'https://davidhume.org', innerHTML: 'Hume Texts Online' })
      ] }),
      new Element('li', { children: [
        new Element('a', { href: 'https://github.com/englishphilosophy', innerHTML: 'Early English Philosophy @ GitHub' })
      ] })
    ] })
  ] })
] })
