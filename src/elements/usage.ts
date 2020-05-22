import {
  Element,
  Analysis,
  Lemma
} from '../../deps_client.ts'

export function summary (analysis: Analysis): Element {
  const isAuthor = analysis.id.split('.').length === 1
  const titleText = isAuthor
    ? 'The collected works of this author contain:'
    : 'This text contains:'
  return new Element('div', { class: 'section-content usage', children: [
    warning,
    new Element('p', { innerHTML: titleText }),
    new Element('ul', { children: [
      new Element('li', { innerHTML: `${analysis.wordCount} words and ${analysis.lemmaWordCount} lexemes` }),
      new Element('li', { innerHTML: `${analysis.names.length} references to named people (totalling ${analysis.nameWordCount} words)` }),
      new Element('li', { innerHTML: `${analysis.citations.length} citations (totalling ${analysis.citationWordCount} words)` }),
      new Element('li', { innerHTML: `${analysis.foreignText.length} instances of foreign text (totalling ${analysis.foreignWordCount} words)` })
    ] })
  ] })
}

export function names (analysis: Analysis): Element {
  return new Element('div', { class: 'section-content usage', children: [
    warning,
    (analysis.names.length > 0)
      ? new Element('ul', { children: analysis.names.map(item) })
      : new Element('p', { innerHTML: 'No named people.' })
  ] })
}

export function citations (analysis: Analysis): Element {
  return new Element('div', { class: 'section-content usage', children: [
    warning,
    (analysis.citations.length > 0)
      ? new Element('ul', { children: analysis.citations.map(item) })
      : new Element('p', { innerHTML: 'No citations.' })
  ] })
}

export function foreignText (analysis: Analysis): Element {
  return new Element('div', { class: 'section-content usage', children: [
    warning,
    (analysis.foreignText.length > 0)
      ? new Element('ul', { children: analysis.foreignText.map(item) })
      : new Element('p', { innerHTML: 'No foreign text.' })
  ] })
}

export function lemmas (analysis: Analysis): Element {
  return new Element('div', { class: 'section-content usage', children: [
    warning,
    new Element('table', { children: [
      new Element('thead', { children: [
        new Element('th', { innerHTML: 'Lemma' }),
        new Element('th', { innerHTML: 'Raw frequency' }),
        new Element('th', { innerHTML: 'TF-IDF' })
      ] }),
      new Element('tbody', { children: analysis.lemmas.map(lemmaRow) })
    ] })
  ] })
}

const warning = new Element('p', { class: 'warning', innerHTML: 'These data are provisional. Their accuracy depends on software that is still being developed, and manual markup that is still being inputted and checked.' })

function item (innerHTML: string): Element {
  return new Element('li', { innerHTML })
}

function lemmaRow (lemma: Lemma): Element {
  return new Element('tr', { children: [
    new Element('td', { innerHTML: lemma.label }),
    new Element('td', { innerHTML: lemma.frequency.toString(10) }),
    new Element('td', { innerHTML: lemma.relativeTfIdf.toString(10).slice(0, 10) })
  ] })
}
