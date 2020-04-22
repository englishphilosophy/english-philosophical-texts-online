import {
  Element,
  Request,
  HtmlResponse
} from '../../deps.ts'
import Page from '../view/page.ts'
import Author from '../data/author.ts'
import Library from '../data/library.ts'
import * as read from './read.ts'

export default function index (request: Request): HtmlResponse {
  const authors = read.authors()

  return new Page('Texts', [
    new Element('p', { innerHTML: summary(authors) }),
    new Element('div', {
      css: { display: 'flex', margin: '0 -0.5em 1em' },
      children: [searchInput, orderSelect]
    }),
    new Library(authors).element,
    new Element('script', { src: '/js/client/library.js' })
  ])
}

function summary (authors: Author[]): string {
  const maleAuthors = authors.filter(a => a.sex === 'Male')
  const femaleAuthors = authors.filter(a => a.sex === 'Female')
  const authorsWithTexts = authors.filter(a => a.texts.some(t => t.imported))
  const totalTexts = authors.reduce((sofar, current) => {
    return sofar + current.texts.length
  }, 0)
  const totalImportedTexts = authorsWithTexts.reduce((sofar, current) => {
    return sofar + current.texts.filter(a => a.imported).length
  }, 0)
  const authorsWithTextsList = authorsWithTexts.reduce((sofar, current, index) => {
    if (index === 0) return current.link
    if (index === authorsWithTexts.length - 1) return `${sofar}, and ${current.link}`
    return `${sofar}, ${current.link}`
  }, '')

  return `Below is a list of ${totalTexts} English-language philosophical texts published in Britain between 1650 and 1830, by ${authors.length} authors (${maleAuthors.length} male and ${femaleAuthors.length} female). Our aim is to provide free and high-quality digital critical editions of all of the works on this list, alongside tools for performing sophisticated searches and comparative textual analyses. Note however that this project is still in the early stages. So far we have prepared ${totalImportedTexts} texts by ${authorsWithTextsList}.`
}

const searchInput = new Element('input', {
  type: 'text',
  placeholder: 'Search authors',
  'data-action': 'filter-authors',
  css: { flex: '1', margin: '0 .5em' }
})

const orderSelect = new Element('select', {
  css: { margin: '0 .5em' },
  'data-action': 'order-authors',
  children: [
    new Element('option', {
      value: 'published',
      innerHTML: 'order chronologically by first publication'
    }),
    new Element('option', {
      value: 'birth',
      innerHTML: 'order chronologically by birth'
    }),
    new Element('option', {
      value: 'alphabetical',
      innerHTML: 'order alphabetically'
    })
  ]
})
