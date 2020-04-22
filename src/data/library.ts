import {
  Element
} from '../../deps_client.ts'
import Author from '../data/author.ts'
import { gray } from '../view/colours.ts'

export default class Library {
  private authors: Author[]
  order: string
  search: string

  constructor (authors: Author[]) {
    this.authors = authors
    this.order = 'published'
    this.search = ''
  }

  get regexp (): RegExp {
    return new RegExp(`\\b(${this.search})`, 'i')
  }

  get element (): Element {
    const authors = (this.regexp !== null)
      ? this.authors.filter(a => a.fullname.match(this.regexp))
      : this.authors.slice()
    authors.sort((a, b) => a.id.localeCompare(b.id, 'en'))

    switch (this.order) {
      case 'published':
        authors.sort((a, b) => a.published - b.published)
        break

      case 'birth':
        authors.sort((a, b) => a.birth - b.birth)
        break
    }

    return new Element('div', {
      id: 'library',
      css: { 'border-top': `1px solid ${gray}` },
      children: authors.map(author => authorSummary(this, author))
    })
  }
}

function authorSummary (library: Library, author: Author): Element {
  return new Element('div', {
    css: { display: 'flex', padding: '1em', 'border-bottom': `1px solid ${gray}` },
    children: [
      authorSummaryHeading(library, author),
      authorSummaryDetails(library, author)
    ]
  })
}

function authorSummaryHeading (library: Library, author: Author): Element {
  const matchedFullname = (library.search.length > 0)
    ? author.fullname.replace(library.regexp, '<mark>$1</mark>')
    : author.fullname

  return new Element('h6', {
    css: { flex: '1' },
    children: [
      new Element('a', {
        href: author.url,
        innerHTML: `${matchedFullname} (${author.birth}-${author.death})`
      })
    ]
  })
}

function authorSummaryDetails (library: Library, author: Author): Element {
  return new Element('div', {
    css: { 'flex-basis': '14em' },
    children: [
      new Element('div', { innerHTML: `Nationality: ${author.nationality}` }),
      new Element('div', { innerHTML: `Sex: ${author.sex}` }),
      new Element('div', { innerHTML: `Texts in library: ${author.importedTexts.length} / ${author.texts.length}` })
    ]
  })
}
