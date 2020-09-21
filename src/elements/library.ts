import type { Element, Author } from '../../deps_client.ts'
import { element } from '../../deps_client.ts'
import * as misc from './misc.ts'

/** Creates the library (list of authors) for the home page. */
export default function library (authors: Author[], search?: string, order: string = 'published'): Element {
  if (search && search.length > 0) {
    authors = authors.filter(author => misc.fullname(author).match(misc.regexp(search)))
  }
  
  authors.sort((a, b) => a.id.localeCompare(b.id, 'en'))
  
  switch (order) {
    case 'published':
      authors.sort((a, b) => a.published - b.published)
      break
  
    case 'birth':
      authors.sort((a, b) => a.birth - b.birth)
      break
  }
  
  return element('div', {
    id: 'library',
    class: 'library',
    children: (authors.length > 0)
      ? authors.map(x => author(x, search))
      : [element('p', { innerHTML: 'No matching authors.' })]
  })
}

/** Creates an HTML element for an author in the library. */
function author (author: Author, search?: string): Element {
  return element('a', { class: 'author', href: misc.url(author),
    children: [
      element('h6', { innerHTML: `${misc.fullname(author, search)} (${author.birth}-${author.death})` }),
      element('div', { class: 'details', children: [
        element('div', { innerHTML: `Nationality: ${author.nationality}` }),
        element('div', { innerHTML: `Sex: ${author.sex}` }),
        element('div', { innerHTML: `Texts in library: ${author.texts.filter(x => x.imported).length} / ${author.texts.length}` })
      ] })
    ]
  })
}
