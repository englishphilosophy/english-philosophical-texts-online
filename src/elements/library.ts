import {
  Element,
  Author
} from '../../deps_client.ts'

import * as misc from './misc.ts'

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
  
  return new Element('div', {
    id: 'library',
    class: 'library',
    children: authors.map(x => author(x, search))
  })
}

function author (author: Author, search?: string): Element {
  return new Element('a', { class: 'author', href: misc.url(author),
    children: [
      new Element('h6', { innerHTML: `${misc.fullname(author, search)} (${author.birth}-${author.death})` }),
      new Element('div', { class: 'details', children: [
        new Element('div', { innerHTML: `Nationality: ${author.nationality}` }),
        new Element('div', { innerHTML: `Sex: ${author.sex}` }),
        new Element('div', { innerHTML: `Texts in library: ${author.texts.filter(x => x.imported).length} / ${author.texts.length}` })
      ] })
    ]
  })
}
