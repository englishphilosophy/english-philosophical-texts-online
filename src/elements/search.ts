import {
  Element, Block
} from '../../deps_client.ts'

import { Result } from '../types/result.ts'
import blocks from './blocks.ts'

export function element (id: string): Element {
  return new Element('div', { class: 'section-content search', children: [
    form(id),
    resultsPlaceholder
  ] })
}

export function results (result?: Result): Element {
  if (!result) {
    return new Element('div', { class: 'results', innerHTML: 'No paragraphs matched your search criteria.' })
  }
  return new Element('div', { class: 'results', children: [displayResult(result)] })
}

function form (id: string): Element {
  return new Element('form', { class: 'search-form', children: [
    new Element('input', { type: 'hidden', name: 'id', value: id }),
    query(1, 'For paragraphs that contain:'),
    query(2, 'But not:'),
    new Element('div', { class: 'group', children: [
      new Element('label', { class: 'label', innerHTML: 'Options:' }),
      new Element('div', { class: 'inputs checkboxes', children: [
        new Element('label', { innerHTML: '<input type="checkbox" name="ignorePunctuation" checked> Ignore Punctuation' }),
        new Element('label', { innerHTML: '<input type="checkbox" name="wholeWords" checked> Match Whole Words' }),
        new Element('label', { innerHTML: '<input type="checkbox" name="variantSpellings" checked> Match Variant Spellings' })
      ] })
    ] }),
    new Element('div', { class: 'group buttons', children: [
      new Element('button', { type: 'submit', innerHTML: 'Search' })
    ] })
] })
}

function query (id: number, label: string): Element {
  return new Element('div', { class: 'group', children: [
    new Element('label', { class: 'label', for: `query${id}1`, innerHTML: label }),
    new Element('div', { class: 'inputs', children: [
      new Element('input', {
        type: 'text',
        name: `query${id}1`,
        id: `query${id}1`,
        'aria-label': `Query ${id} first term`,
        required: (id === 1) ? 'required' : undefined
      }),
      new Element('select', { name: `query${id}op`, 'aria-label': `Query ${id} operator`, children: [
        new Element('option', { value: 'and', innerHTML: 'AND' }),
        new Element('option', { value: 'or', innerHTML: 'OR' })
      ] }),
      new Element('input', {
        type: 'text',
        name: `query${id}2`,
        'aria-label': `Query ${id} second term`
      })
    ] })
  ] })
}

const resultsPlaceholder = new Element('div', { class: 'results hidden' })

function displayResult (result: Result): Element {
  const children = [
    new Element('h4', { class: 'title', innerHTML: result.title }),
    new Element('p', {
      class: 'total',
      innerHTML: `${result.total} matching paragraphs`,
      onclick: 'event.currentTarget.nextElementSibling.classList.toggle(\'active\')'
    })
  ]
  if (result.blocks.length > 0) {
    // results come from JSON send to the browser, so blocks won't be instances of
    // the block class
    children.push(new Element('div', { class: 'results', children: [blocks(result.blocks.map(x => new Block(x)))] }))
  }
  if (result.results.length > 0) {
    children.push(new Element('div', { class: 'results', children: result.results.map(displayResult) }))
  }
  return new Element('div', { class: 'result', children })
}
