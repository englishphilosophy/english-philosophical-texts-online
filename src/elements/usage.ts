import type { Element, Analysis, Lemma } from '../../deps_client.ts'
import { element } from '../../deps_client.ts'

export function summary (analysis: Analysis): Element {
  const isAuthor = analysis.id.split('.').length === 1
  const titleText = isAuthor
    ? 'The collected works of this author contain:'
    : 'This text contains:'
  return element('div', { class: 'section-content usage', children: [
    warning,
    element('p', { innerHTML: titleText }),
    element('ul', { children: [
      element('li', { innerHTML: `${analysis.wordCount} words and ${analysis.lemmaWordCount} lexemes` }),
      element('li', { innerHTML: `${analysis.names.length} references to named people (totalling ${analysis.nameWordCount} words)` }),
      element('li', { innerHTML: `${analysis.citations.length} citations (totalling ${analysis.citationWordCount} words)` }),
      element('li', { innerHTML: `${analysis.foreignText.length} instances of foreign text (totalling ${analysis.foreignWordCount} words)` })
    ] })
  ] })
}

export function names (analysis: Analysis): Element {
  return element('div', { class: 'section-content usage', children: [
    warning,
    (analysis.names.length > 0)
      ? element('ul', { children: analysis.names.map(item) })
      : element('p', { innerHTML: 'No named people.' })
  ] })
}

export function citations (analysis: Analysis): Element {
  return element('div', { class: 'section-content usage', children: [
    warning,
    (analysis.citations.length > 0)
      ? element('ul', { children: analysis.citations.map(item) })
      : element('p', { innerHTML: 'No citations.' })
  ] })
}

export function foreignText (analysis: Analysis): Element {
  return element('div', { class: 'section-content usage', children: [
    warning,
    (analysis.foreignText.length > 0)
      ? element('ul', { children: analysis.foreignText.map(item) })
      : element('p', { innerHTML: 'No foreign text.' })
  ] })
}

export function lemmas (analysis: Analysis): Element {
  return element('div', { class: 'section-content usage', children: [
    warning,
    element('table', { children: [
      element('thead', { children: [
        element('th', { innerHTML: 'Lemma' }),
        element('th', { innerHTML: 'Raw frequency' }),
        element('th', { innerHTML: 'TF-IDF' })
      ] }),
      element('tbody', { children: analysis.lemmas.map(lemmaRow) })
    ] })
  ] })
}

const warning = element('p', { class: 'warning', innerHTML: 'These data are provisional. Their accuracy depends on software that is still being developed, and manual markup that is still being inputted and checked.' })

function item (innerHTML: string): Element {
  return element('li', { innerHTML })
}

function lemmaRow (lemma: Lemma): Element {
  return element('tr', { children: [
    element('td', { innerHTML: lemma.label }),
    element('td', { innerHTML: lemma.frequency.toString(10) }),
    element('td', { innerHTML: lemma.relativeTfIdf.toString(10).slice(0, 10) })
  ] })
}
