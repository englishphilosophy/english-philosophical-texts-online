import {
  Element,
  Analysis,
  Lemma
} from '../../deps_client.ts'

export function usage (analysis: Analysis): Element {
  return new Element('div', { id: 'usage', class: 'usage', 'data-id': analysis.id, children: [
    totals(analysis),
    stub('names', 'Named people'),
    stub('citations', 'Citations'),
    stub('foreignText', 'Foreign text'),
    stub('lemmas', 'Lemmas')
  ] })
}

function stub (data: 'names'|'citations'|'foreignText'|'lemmas', title: string): Element {
  return new Element('div', { class: 'data collapsed', 'data-content': data, children: [
    new Element('h2', { children: [
      new Element('a', { innerHTML: `${title} <span>(expand)</span>` })
    ] }),
    new Element('div', { class: 'content', innerHTML: 'Loading data...' })
  ] })
}

function totals (analysis: Analysis): Element {
  const isAuthor = analysis.id.split('.').length === 1
  const titleText = isAuthor
    ? 'The collected works of this author contain:'
    : 'This text contains:'
  return new Element('div', { children: [
    new Element('h2', { innerHTML: 'Word usage summary' }),
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
  return new Element('ul', { children: analysis.names.map(item) })
}

export function citations (analysis: Analysis): Element {
  return new Element('ul', { children: analysis.citations.map(item) })
}

export function foreignText (analysis: Analysis): Element {
  return new Element('ul', { children: analysis.foreignText.map(item) })
}

function item (innerHTML: string): Element {
  return new Element('li', { innerHTML })
}

export function lemmas (analysis: Analysis): Element {
  return new Element('table', { children: [
    new Element('thead', { children: [
      new Element('th', { innerHTML: 'Lemma' }),
      new Element('th', { innerHTML: 'Frequency' }),
      new Element('th', { innerHTML: 'TF-IDF (absolute)' }),
      new Element('th', { innerHTML: 'TF-IDF (relative)' })
    ] }),
    new Element('tbody', { children: analysis.lemmas.map(lemmaRow) })
  ] })
}

function lemmaRow (lemma: Lemma): Element {
  return new Element('tr', { children: [
    new Element('td', { innerHTML: lemma.label }),
    new Element('td', { innerHTML: lemma.frequency.toString(10) }),
    new Element('td', { innerHTML: lemma.absoluteTfIdf.toString(10).slice(0, 10) }),
    new Element('td', { innerHTML: lemma.relativeTfIdf.toString(10).slice(0, 10) })
  ] })
}
