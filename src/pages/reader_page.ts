import {
  Element,
  Analysis,
  Author,
  Text
} from '../../deps.ts'

import Page from './page.ts'
import * as misc from '../elements/misc.ts'
import breadcrumb from '../elements/breadcrumb.ts'
import links from '../elements/links.ts'
import reader from '../elements/reader.ts'
import toc from '../elements/toc.ts'
import blocks from '../elements/blocks.ts'
import lemmas from '../elements/lemmas.ts'

type Data = { type: 'Author', value: Author }
          | { type: 'Text', value: Text }
          | { type: 'About', value: Text }

export default class ReaderPage extends Page {
  constructor (data: Data, ancestors: (Author|Text)[], analysis?: Analysis) {
    const title = (data.type === 'Author') ? authorTitle(data.value) : textTitle(data.value)
    const section = analysis ? 'Usage' : data.type
    const content = [links(data.value, section)]
    if (analysis) {
      content.push(...analysisContent(analysis))
    } else {
      switch (data.type) {
        case 'Author':
          content.push(...authorContent(data.value))
          break
        case 'Text':
          content.push(...textContent(data.value))
          break
        case 'About':
          content.push(...aboutContent(data.value))
          break
      }
    }

    super({ section: 'Texts', main: [reader(title, content)], nav: [breadcrumb(ancestors)] })
  }
}

function authorTitle (author: Author): Element[] {
  return [
    new Element('h2', { innerHTML: `${misc.fullname(author)} (${author.birth}-${author.death})` }),
    new Element('h4', { innerHTML: `${author.nationality}, ${author.sex}` }),
  ]
}

function authorContent (author: Author): Element[] {
  return [
    new Element('h2', { innerHTML: 'Texts' }),
    toc(author)
  ]
}

function textTitle (text: Text): Element[] {
  return [blocks(text.blocks.slice(0, 1))]
}

function textContent (text: Text): Element[] {
  if (text.texts.length) {
    return [
      new Element('h2', { innerHTML: 'Contents' }),
      toc(text)
    ]
  }

  return [blocks(text.blocks.slice(1))]
}

function aboutContent(text: Text): Element[] {
  return [
    new Element('h2', { innerHTML: 'First published' }),
    new Element('p', { innerHTML: text.published }),
    new Element('h2', { innerHTML: 'Copytext' }),
    new Element('p', { innerHTML: text.copytext }),
    new Element('h2', { innerHTML: 'Source' }),
    new Element('p', { innerHTML: text.sourceUrl || 'none' }),
    new Element('h2', { innerHTML: 'Comments' }),
    new Element('p', { innerHTML: text.sourceDesc })
  ]
}

function analysisContent (analysis: Analysis): Element[] {
  return [lemmas(analysis)]
}
