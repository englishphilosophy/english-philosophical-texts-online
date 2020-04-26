import {
  Element,
  Author
} from '../../deps.ts'

import Page from './page.ts'
import toc from '../elements/toc.ts'
import * as misc from '../elements/misc.ts'

export default class AuthorPage extends Page {
  constructor (author: Author) {
    super({ section: 'Texts', main: [
      new Element('div', { class: 'reader', children: [details(author), toc(author)] })
    ] })
  }
}

function details (author: Author): Element {
  return new Element('div', { children: [
    new Element('h2', { innerHTML: `${misc.fullname(author)} (${author.birth}-${author.death})` }),
    new Element('h4', { innerHTML: `${author.nationality}, ${author.sex}` }),
  ] })
}
