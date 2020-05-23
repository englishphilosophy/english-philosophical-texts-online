import {
  Element,
  Author,
  Analysis,
  Text
} from '../../deps_client.ts'

import blocks from './blocks.ts'
import toc from './toc.ts'
import * as search from './search.ts'
import * as about from './about.ts'
import * as usage from './usage.ts'

type T_Section = 'title'|'content'|'search'|'summary'|'names'|'citations'|'foreign'|'lemmas'|'about'

type A_Section = 'about'|'works'|'search'|'summary'|'names'|'citations'|'foreign'|'lemmas'

export function text (text: Text, analysis: Analysis): Element {
  return new Element('div', { class: 'reader', children: [
    section(textContent(text, analysis, 'title')),
    section(textContent(text, analysis, 'content'), textSelect(text, 'content'))
  ] })
}

export function textContent (text: Text, analysis: Analysis, section: T_Section): Element {
  switch (section) {
    case 'title':
      return blocks(text.blocks.slice(0, 1))

    case 'content':
      return text.texts.length ? toc(text) : blocks(text.blocks.slice(1))

    case 'search':
      return search.element(text.id)

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

export function author (author: Author, analysis: Analysis): Element {
  return new Element('div', { class: 'reader', children: [
    section(authorContent(author, analysis, 'about')),
    section(authorContent(author, analysis, 'works'), authorSelect(author, 'works'))
  ] })
}

export function authorContent (author: Author, analysis: Analysis, section: A_Section): Element {
  switch (section) {
    case 'about':
      return about.author(author)
  
    case 'works':
      return toc(author)

    case 'search':
      return search.element(author.id)

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

function section (content: Element, select?: Element): Element {
  return new Element('div', { class: 'section-wrapper', children: [
    new Element('div', { class: 'section', children: select ? [select, content] : [content] })
  ] })
}

function textSelect (text: Text, section: T_Section): Element {
  return new Element('select', {
    class: 'section-menu',
    disabled: true,
    'data-text': text.id,
    'aria-label': 'Area',
    children: [
      new Element('optgroup', { label: 'Text', children: [
        option((text.texts.length > 0 ? 'Table of Contents' : 'Text'), 'content', section === 'content'),
        option('Search', 'search', section === 'search')
      ] }),
      new Element('optgroup', { label: 'Analysis', children: [
        option('Word usage summary', 'summary', section === 'summary'),
        option('Named people', 'names', section === 'names'),
        option('Citations', 'citations', section === 'citations'),
        option('Foreign text', 'foreign', section === 'foreign'),
        option('Lemmas', 'lemmas', section === 'lemmas')
      ] }),
      new Element('optgroup', { label: 'About', children: [
        option('About', 'about', section === 'about')
      ] })
    ]
  })
}

function authorSelect (author: Author, section: A_Section): Element {
  return new Element('select', {
    class: 'section-menu',
    disabled: true,
    'data-author': author.id,
    'aria-label': 'Area',
    children: [
      new Element('optgroup', { label: 'Author', children: [
        option('Works', 'works', section === 'works'),
        option('Search', 'search', section === 'search')
      ] }),
      new Element('optgroup', { label: 'Analysis', children: [
        option('Word usage summary', 'summary', section === 'summary'),
        option('Named people', 'names', section === 'names'),
        option('Citations', 'citations', section === 'citations'),
        option('Foreign text', 'foreign', section === 'foreign'),
        option('Lemmas', 'lemmas', section === 'lemmas')
      ] })
    ]
  })
}

function option (innerHTML: string, value: string, selected: boolean): Element {
  return new Element('option', { value, innerHTML, selected: selected ? 'selected' : undefined })
}
