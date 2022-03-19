import type { Element, Author, Analysis, Text } from '../../deps_client.ts'
import type { AuthorSection, TextSection } from '../types/section.ts'
import { element } from '../../deps_client.ts'
import blocks from './blocks.ts'
import toc from './toc.ts'
import * as search from './search.ts'
import * as about from './about.ts'
import * as usage from './usage.ts'

/** Create the HTML content for a text display. */
export const text = (text: Text, analysis: Analysis): Element => {
  return element('div', { class: 'reader', children: [
    section(textContent(text, analysis, 'title')),
    section(textContent(text, analysis, 'content'), textSelect(text, 'content'))
  ] })
}

/** Create the HTML content for a section of a text display. */
export const textContent = (text: Text, analysis: Analysis, section: TextSection): Element => {
  switch (section) {
    case 'title':
      return blocks(text.blocks.slice(0, 1))

    case 'content':
      return text.texts.length ? toc(text) : blocks(text.blocks.slice(1))

    case 'search':
      return search.search(text.id)

    case 'summary':
      return usage.summary(analysis)

    case 'names':
      return usage.names(analysis)

    case 'citations':
      return usage.citations(analysis)

    case 'foreign':
      return usage.foreignText(analysis)

    case 'lemmas':
      return usage.lemmas(analysis)

    case 'about':
      return about.text(text)
  }
}

/** Create the HTML content for an author display. */
export const author = (author: Author, analysis: Analysis): Element => {
  return element('div', { class: 'reader', children: [
    section(authorContent(author, analysis, 'about')),
    section(authorContent(author, analysis, 'works'), authorSelect(author, 'works'))
  ] })
}

/** Create the HTML content for a section of an author display. */
export const authorContent = (author: Author, analysis: Analysis, section: AuthorSection): Element => {
  switch (section) {
    case 'about':
      return about.author(author)
  
    case 'works':
      return toc(author)

    case 'search':
      return search.search(author.id)

    case 'summary':
      return usage.summary(analysis)

    case 'names':
      return usage.names(analysis)

    case 'citations':
      return usage.citations(analysis)

    case 'foreign':
      return usage.foreignText(analysis)

    case 'lemmas':
      return usage.lemmas(analysis)
  }
}

const section = (content: Element, select?: Element): Element => {
  return element('div', { class: 'section-wrapper', children: [
    element('div', { class: 'section', children: select ? [select, content] : [content] })
  ] })
}

const textSelect = (text: Text, section: TextSection): Element => {
  return element('select', {
    class: 'section-menu',
    disabled: true,
    'data-text': text.id,
    'aria-label': 'Area',
    children: [
      element('optgroup', { label: 'Text', children: [
        option((text.texts.length > 0 ? 'Table of Contents' : 'Text'), 'content', section === 'content'),
        option('Search', 'search', section === 'search')
      ] }),
      element('optgroup', { label: 'Analysis', children: [
        option('Word usage summary', 'summary', section === 'summary'),
        option('Named people', 'names', section === 'names'),
        option('Citations', 'citations', section === 'citations'),
        option('Foreign text', 'foreign', section === 'foreign'),
        option('Lemmas', 'lemmas', section === 'lemmas')
      ] }),
      element('optgroup', { label: 'About', children: [
        option('About', 'about', section === 'about')
      ] })
    ]
  })
}

const authorSelect = (author: Author, section: AuthorSection): Element => {
  return element('select', {
    class: 'section-menu',
    disabled: true,
    'data-author': author.id,
    'aria-label': 'Area',
    children: [
      element('optgroup', { label: 'Author', children: [
        option('Works', 'works', section === 'works'),
        option('Search', 'search', section === 'search')
      ] }),
      element('optgroup', { label: 'Analysis', children: [
        option('Word usage summary', 'summary', section === 'summary'),
        option('Named people', 'names', section === 'names'),
        option('Citations', 'citations', section === 'citations'),
        option('Foreign text', 'foreign', section === 'foreign'),
        option('Lemmas', 'lemmas', section === 'lemmas')
      ] })
    ]
  })
}

const option = (innerHTML: string, value: string, selected: boolean): Element => {
  return element('option', { value, innerHTML, selected: selected ? 'selected' : undefined })
}
