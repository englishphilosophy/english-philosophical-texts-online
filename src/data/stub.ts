import {
  Element
} from '../../deps_client.ts'

export default class Stub {
  imported: boolean
  id: string
  title: string
  breadcrumb: string
  published: number

  constructor (data: any) {
    this.imported = data.imported
    this.id = data.id
    this.title = data.title
    this.breadcrumb = data.breadcrumb
    this.published = data.published
  }

  get fulltitle (): string {
    return `${this.title} (${this.published})`
  }

  get url (): string {
    return `/texts/${this.id.toLowerCase().replace(/\./g, '/')}`
  }

  get element (): Element {
    return this.imported
      ? new Element('li', { children: [
          new Element('a', { href: this.url, innerHTML: this.fulltitle })
        ] })
      : new Element('li', { innerHTML: this.fulltitle })
  }
}
