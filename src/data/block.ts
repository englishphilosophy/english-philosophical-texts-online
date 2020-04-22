import {
  Element,
  TagName
} from '../../deps_client.ts'

export default class Block {
  id: string
  markit: string

  constructor (data: any) {
    this.id = data.id
    this.markit = data.markit
  }

  get element (): Element {
    return new Element('div', {
      id: this.id,
      children: [
        new Element('div', { innerHTML: this.id }),
        new Element('div', { innerHTML: this.markit })
      ]
    })
  }
}
