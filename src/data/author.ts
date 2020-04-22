import {
  Element
} from '../../deps_client.ts'
import Stub from './stub.ts'

export default class Author {
  id: string
  forename: string
  surname: string
  title: string|null
  birth: number
  death: number
  published: number
  nationality: string
  sex: string
  texts: Stub[]

  constructor (data: any) {
    this.id = data.id
    this.forename = data.forename
    this.surname = data.surname
    this.title = data.title || null
    this.birth = data.birth
    this.death = data.death
    this.published = data.published
    this.nationality = data.nationality
    this.sex = data.sex
    this.texts = data.texts.map((data: any) => new Stub(data))
  }

  get fullname (): string {
    return this.title
      ? `${this.title} [${this.forename} ${this.surname}]`
      : `${this.forename} ${this.surname}`
  }

  get importedTexts (): Stub[] {
    return this.texts.filter(x => x.imported)
  }

  get url (): string {
    return `/texts/${this.id.toLowerCase()}`
  }

  get link (): string {
    return `<a href="${this.url}">${this.fullname}</a>`
  }

  get element (): Element {
    return new Element('div', { children: [
      new Element('h1', { innerHTML: this.fullname }),
      new Element('p', { innerHTML: `${this.nationality}, ${this.sex}` }),
      new Element('ul', { children: this.texts.map(x => x.element) })
    ] })
  }
}
