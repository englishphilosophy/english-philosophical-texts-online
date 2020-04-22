import {
  Element
} from '../../deps_client.ts'
import Block from './block.ts'
import Stub from './stub.ts'

export default class Text {
  imported: boolean
  title: string
  breadcrumb: string
  copytext: number
  sourceUrl: string
  sourceDesc: string
  texts: Stub[]
  blocks: Block[]
  wordCount: number
  lemmas: Array<{ label: string, frequency: number }>

  constructor (data: any) {
    this.imported = data.imported || false
    this.title = data.title
    this.breadcrumb = data.breadcrumb
    this.copytext = data.copytext
    this.sourceUrl = data.sourceUrl
    this.sourceDesc = data.sourceDesc
    this.texts = data.texts.map((x: any) => new Stub(x))
    this.blocks = data.blocks.map((x: any) => new Block(x))
    this.wordCount = data.wordCount || 0
    this.lemmas = data.lemmas || []
  }

  get element (): Element {
    if (!this.imported) {
      return new Element('p', { innerHTML: 'This text has not yet been imported.' })
    }
    if (this.texts.length > 0) {
      return new Element('div', { children: [
        new Element('div', { children: this.blocks.map(x => x.element) }),
        new Element('ul', { children: this.texts.map(x => x.element) })
      ] })
    }
    return new Element('div', { children: this.blocks.map(x => x.element) })
  }

  get lemmasTable (): Element {
    if (this.lemmas.length > 0) {
      return new Element('table', { children: [
        new Element('thead', {
          innerHTML: '<tr><th>lemma</th><th>frequency</th></tr>'
        }),
        new Element('tbody', { children: this.lemmas.map((lemma) => {
          return new Element('tr', { children: [
            new Element('td', { innerHTML: lemma.label }),
            new Element('td', { innerHTML: lemma.frequency.toString(10) }),
            new Element('td', { innerHTML: `${Math.round(lemma.frequency / this.wordCount * 100)}%` })
          ] })
        }) })
      ] })
    } else {
      return new Element('p', { innerHTML: 'No lemmas.' })
    }
  }
}
