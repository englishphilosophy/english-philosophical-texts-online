import {
  Element
} from '../../deps_client.ts'

/** Content for the main research page. */
const research = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Introduction' }),
  new Element('p', { innerHTML: 'In addition to providing high-quality critical texts for each of the works listed on this site, we also plan to develop software for searching and analysing these texts in a variety of useful ways, and to pursue research illustrating the scholarly application and value of these tools. So far, it is possible to run complex Boolean searches, in the Search area for each text, and to view (provisional) word usage analysis in the several Analysis areas. (When reading a text, select the area of interest from the blue dropdown menu.) Our project is still in the early stages, with many more features planned if we secure funding to take things further. In the meantime, details are available here of some preliminary tests we have run so far.' }),
  new Element('h2', { innerHTML: 'Sophisticated searches' }),
  new Element('p', { innerHTML: 'In the Search area for each author and text, you can perform complex Boolean searches, optionally limiting your search to whole words, with or without checking for punctuation. It is also possible to expand your search to include variant spellings of your search terms. This is made possible by our growing dictionary, which will in due course contain a record of <em>every</em> word in <em>every</em> text in our corpus. Note that this dictionary is still under construction, and hence that not all variant spellings will be matched yet.' }),
  new Element('h2', { innerHTML: 'Word usage analysis' }),
  new Element('p', { innerHTML: 'This growing dictionary also forms the basis of our lemmatization function, which — when complete — will map every word in our corpus to its corresponding lemma (e.g. ‘argue’, ‘argues’, ‘argued’, and ‘arguing’ are all mapped to the single lemma ‘argue’). At the same time, we are marking up our editions to identify named individuals, citations, and foreign text. Of interest in their own right, these things can then be filtered out of the lemmatization process and subsequent analysis.' }),
  new Element('p', { innerHTML: 'From here, we are able to calculate the <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf"><i>term frequency-inverse document frequency</i> (TF-IDF)</a> of every lemma in every text (minus named individuals, citations, and foreign text). This standard measure, widely used in information retrieval systems (notably Google’s search algorithm), multiplies the frequency of a term in a document with its rarity in the corpus as a whole; thus very frequent but very common words (‘a’, ‘in’, ‘the’, ‘to’, etc.) have very low TF-IDF values, while frequent and rare words have very high values. With this measure, we can create an ordered list of the most frequent <em>and distinctive</em> words in any given text. This list is available for each text on our site in the Lemmas area.' }),
  new Element('h2', { innerHTML: 'Where next' }),
  new Element('p', { innerHTML: 'If we are lucky enough to secure funding, we will be completing our collection of critical texts, completing our dictionary, completing our markup of the texts, and developing many more analytical tools. These tools will enable searches with wildcards, the generation of usage data for multi-word phrases and word patterns, statistical analyses, and the graphical visualisation of results. For a small taste of what may become possible, see the other pages in this section on our pilot case studies. We welcome suggestions for other features that might be of interest or of use in your research.' })
] })

/** Content for the similarity page. */
const similarity = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Semantic Similarity' }),
  new Element('p', { innerHTML: 'Details to be added soon.' }),
] })

/** Content for the topics page. */
const topics = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Topic Frequency' }),
  new Element('p', { innerHTML: 'Details to be added soon.' }),
] })

/** An array of research pages. */
export default [
  { id: 'research', title: 'Introduction', url: '/research', content: research },
  { id: 'similarity', title: 'Semantic Similarity', url: '/research/similarity', content: similarity },
  { id: 'topics', title: 'Topic Frequency', url: '/research/topics', content: topics }
]
