import {
  Element,
  Analysis,
  Lemma
} from '../../deps_client.ts'

export default function lemmas (analysis: Analysis): Element {
  return new Element('div', { children: [
    new Element('table', { children: [
      new Element('thead', { children: [
        new Element('th', { innerHTML: 'Lemma' }),
        new Element('th', { innerHTML: 'Frequency' }),
        new Element('th', { innerHTML: 'TF-IDF' })
      ] }),
      new Element('tbody', { children: analysis.lemmas.map(lemmaRow) })
    ] })
  ] })
}

function lemmaRow (lemma: Lemma): Element {
  return new Element('tr', { children: [
    new Element('td', { innerHTML: lemma.label }),
    new Element('td', { innerHTML: lemma.frequency.toString(10) }),
    new Element('td', { innerHTML: lemma.tfidf.toString(10) })
  ] })
}
