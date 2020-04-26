import {
  Element,
  HtmlResponse
} from '../../deps.ts'

import header from '../elements/header.ts'
import nav from '../elements/nav.ts'
import main from '../elements/main.ts'
import css from './css.ts'

type Options = {
  title?: string
  section: 'Texts'|'Search'|'Compare'|'About'|'Error'
  nav?: Element[]
  main: Element[]
}

export default class Page extends HtmlResponse {
  constructor (options: Options) {
    const content = new Element('html', {
      lang: 'en',
      children: [head(options), body(options)]
    })
    super(content)
  }
}

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
    new Element('link', { rel: 'shortcut icon', href: '/images/favicon.ico' }),
    new Element('script', { defer: true, src: '/js/client/app.ts' })
    // new Element('script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-23731986-3' }),
    // new Element('script', { innerHTML: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'UA-23731986-3\');' })
  ]})
}

function body (options: Options): Element {
  const children = [header(options.section)]
  if (options.nav) children.push(nav(options.nav))
  children.push(main(options.main))
  return new Element('body', { children })
}
