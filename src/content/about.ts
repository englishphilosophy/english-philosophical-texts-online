import {
  Element,
  Author,
  Text
} from '../../deps_client.ts'

import * as misc from '../elements/misc.ts'
import statements from './statements.ts'

/** Content for the main about page. */
const about = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'General Information' }),
  new Element('p', { innerHTML: '<i>English Philosophical Texts Online</i> is part of a project at the <a href="https://www.ox.ac.uk">University of Oxford</a>. Our aim is to provide high-quality digital editions of a broad canon of English language philosophical works published in Britain between 1650 and 1830, to make them freely available in one place, and to provide intuitive software for performing sophisticated searches and computational analyses of these works. For more information about the analytical software we have planned, see the <a href="/research">Research</a> section of this site.' }),
  new Element('p', { innerHTML: 'Roughly 40% our target works have already been digitised, through projects like the <a href="http://www.textcreationpartnership.org/">Text Creation Partnership</a>, the <a href="http://oll.libertyfund.org/">Online Library of Liberty</a>, and <a href="https://www.gutenberg.org/">Project Gutenberg</a>. However, these works can be difficult to locate unless you already know where to look, and the fact that they are spread out over multiple sites prohibits systematic searching and comparative computational analysis. Furthermore, the editions on these sites do not include universal paragraph references, making them of limited use to historians of philosophy. By combining these works with new digitisations of as many other works, including several by often neglected female writers, we hope to provide a lasting scholarly resource of unparalleled size in this field.' }),
  new Element('p', { innerHTML: 'Thanks to the <a href="https://innovation.ox.ac.uk/award-details/john-fell-fund/">John Fell Fund</a>, we conducted a pilot project last year (2018-19), the principal aim of which was to draw up a list of works, locate the best publicly available digital editions of those works, and to estimate the cost and feasibility of converting these editions into a consistent format and of digitizing the works that remain. We are now applying to the Leverhulme Trust for the necessary funds to see the project through to completion. We continue to seek input from scholars, teachers, and other interested parties, so please <a href="/contact">contact us</a> with any suggestions, queries, or expressions of interest.' })
] })

/** Content for the corpus page (includes live corpus data). */
function corpus (authors: Author[]): Element {
  const maleAuthors = authors.filter(a => a.sex === 'Male')
  const femaleAuthors = authors.filter(a => a.sex === 'Female')
  const authorsWithTexts = authors.filter(a => a.texts.some(t => t.imported))

  const texts = authors.reduce((sofar: Text[], current) => sofar.concat(current.texts), [])
  const importedTexts = texts.filter(x => x.imported)
  const duplicatedTexts = texts.filter(x => x.duplicate)

  const authorsWithTextsList = authorsWithTexts.reduce((sofar, current, index) => {
    if (index === 0) return misc.link(current)
    if (index === authorsWithTexts.length - 1) return `${sofar}, and ${misc.link(current)}`
    return `${sofar}, ${misc.link(current)}`
  }, '')

  return new Element('div', { class: 'content', children: [
    new Element('h1', { innerHTML: 'Corpus Details' }),
    new Element('p', { innerHTML: `The corpus on this site contains ${texts.length - (duplicatedTexts.length / 2)} English-language philosophical texts published in Britain between 1650 and 1830, by ${authors.length} authors (${maleAuthors.length} male and ${femaleAuthors.length} female). Our aim is to provide free and high-quality digital critical texts for all of the works in our corpus, alongside tools for performing sophisticated searches and comparative textual analyses. Note however that this project is still in the early stages. So far we have prepared ${importedTexts.length} texts by ${authorsWithTextsList}.` }),
    new Element('p', { innerHTML: 'Our selection is based on the following general considerations:' }),
    new Element('ol', { children: [
      new Element('li', { innerHTML: 'Works should be originally published in English. This restriction is necessary because of the kinds of computational linguistic analyses we want to run, which only make sense applied to a single language. Hobbes and Conway necessitate bending this rule slightly. We have included the English versions of Hobbes’s works that he himself published (even if he published a Latin version first), but excluded his Latin works that were only translated posthumously. The original English manuscript of Conway’s <em>Principles of Ancient and Modern Philosophy</em>, meanwhile, does not survive. It was first published in a Latin translation, then posthumously translated from the Latin back into English; we have included this third-hand English text, for want of anything better.' }),
      new Element('li', { innerHTML: 'Works should be philosophical in a suitably broad sense, given the period, and consequently the list includes many works on what we would now consider more as theology or social science. We have even included two histories of England (Hume’s and Macaulay’s), but only because of the independent philosophical interest in these writers; we are not including histories more generally.' }),
      new Element('li', { innerHTML: 'Works should be written by a known British author (the highly influential Dutch-born immigrant Mandeville being a partial exception to this rule). This is simply to keep things within reasonable bounds. Works by unknown authors or North American writers could be added in the future. (This is why—with apologies to the Irish, Scottish, and Welsh—we have called this site <em>English</em> Philosophical Texts Online, and not <em>British</em> Philosophical Texts Online. As with the similarly titled <em>Early English Books Online</em>, it is to the language and not the nation that we are referring.)' }),
      new Element('li', { innerHTML: 'The collection should include adequate female representation, with a minimum target of 20%. Happily we are exceeding that target comfortably at present.' })
    ] }),
    new Element('p', { innerHTML: 'We welcome suggestions for additional works of interest that we may have missed. Particularly welcome are works by neglected or forgotten female philosophers.' })
  ] })
}

/** Content for the editorial principles page. */
const principles = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Editorial Principles' }),
  new Element('p', { innerHTML: 'The purpose of this project is to make a broad canon of English philosophical texts easily and freely available for students and scholars to read, search, and coputationally analyse and compare. To this end, and to keep things within reasonable bounds, we aim to provide just one <em>critical text</em> for each work, but a critical text without any textual apparatus or commentary. In other words, we aim to identify the most authoritative copytext – typically the last edition the author saw through the press – and then to silently ‘correct’ it according to our best judgement (e.g. by incorporating variants from another edition or manuscript that seem preferable, or implementing changes noted in any published ERRATA sheets).' }),
  new Element('p', { innerHTML: 'A silently edited critical text, without any accompanying critical apparatus, is of course of limited use for serious textual scholarship. But the editions provided on this site are not intended for that purpose.' }),
  new Element('p', { innerHTML: 'Though our <em>aim</em> is to provide (silently edited) critical texts, we expect to be striving towards this goal for some time, and we will provide imperfect editions along the way. In practice, we will be constrained by the quality of the publicly available digital editions that we have to start with, and by our own limited time and resources. We would be enormously grateful if, while using the texts on this site, you could keep an eye out for potential errors and inform us of any that you notice.' }),
  new Element('h2', { innerHTML: 'Formatting' }),
  new Element('p', { innerHTML: 'Our copytexts use italics and small-caps for emphasis, and sometimes capitalise (or render in small-caps) the first word of every paragraph. We replicate this formatting here. As a rule, we do not extend such formatting to the surrounding punctuation (in the original texts it is not always clear whether the surrounding punctuation is thus formatted or not). Many texts also start each section with a large dropped capital (spanning two lines), or even an ornamented capital. These are rendered here simply as normal capital letters.' }),
  new Element('h2', { innerHTML: 'Notes' }),
  new Element('p', { innerHTML: 'All notes are rendered here as endnotes at the end of each section (in an online publication with no page breaks, the idea of a footnote does not apply). For ease of reference, we have replaced note anchors with numbers. In some original texts, there is a distinction between footnotes and endnotes; in such cases, there is invariably a footnote pointing the reader to the relevant endnote. We preserve this distinction by reproducing the footnote text pointing to the endnote, but then display the text of the endnote immediately following.' }),
  new Element('h2', { innerHTML: 'Margin Comments' }),
  new Element('p', { innerHTML: 'Some texts include small comments printed in the margin, typically indicating the topic currently being addressed in the main text. These comments are rendered here floating to the right of the paragraph, rather than in the actual margin.' }),
  new Element('h2', { innerHTML: 'Apostrophes' }),
  new Element('p', { innerHTML: 'The use of the apostrophe changed during the eighteenth century, eventually settling on the present conventions. In the seventeenth and early eighteenth century, however, its usage was somewhat inconsistent. We preserve these inconsistencies here, leaving apostrophes as they are in the originals.' })
] })

/** Content for the permissions page. */
const permissions = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Permissions' }),
  new Element('p', { innerHTML: 'The works on this site are all in the public domain. The digital critical texts made available here, insofar as they consitute new intellectual property (in virtue of the digitization itself, editorial interventions, and metatextual markup), are all made available under a Creative Commons <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Attribution-NonCommercial-ShareAlike 4.0 License</a>. In plain terms, you are free to use and adapt these materials however you like, as long as you are not making a profit, you acknowledge this web site as their source, and you make whatever you produce available under the same terms.' }),
  new Element('p', { innerHTML: 'In several cases these texts here derive from digitized texts from other sources. We have only started from texts that are either in the public domain (such as those from the <i>Text Creation Partnership</i>) or have a suitably generous copyright (such as those from the <i>Online Library of Liberty</i>, which are free to use for educational and academic purposes). Details of the providence of each text are available via the About section for that text.' })
] })

/** Content for the contact page. */
const contact = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Contact Us' }),
  new Element('p', { innerHTML: '<i>English Philosophical Texts Online</i> is being developed by <a href="https://merivale.uk">Amyas Merivale</a> and <a href="http://www.millican.org">Peter Millican</a> at the <a href="https://www.ox.ac.uk">University of Oxford</a>. We are philosophers and historians of 18th century philosophy, with a keen interest in digital humanities and in the value of high-quality digital texts. We developed <a href="https://davidhume.org">Hume Texts Online</a>, a site providing free digital editions of the complete works of David Hume. With this larger project we hope to provide a similar resource encompassing the works of many more British philosophers.' }),
  new Element('p', { innerHTML: 'For suggestions or queries, please contact Amyas Merivale at <a href="mailto:amyas.merivale@philosophy.ox.ac.uk">amyas.merivale@philosophy.ox.ac.uk</a>.' })
] })

/** Content for the support page (using statements of support from `statements.ts`). */
const support = new Element('div', { class: 'content', children: [
  new Element('h1', { innerHTML: 'Statements of Support' }),
  new Element('div', { children: statements.map(x => {
    const innerHTML = x.affiliation
      ? `${x.from}, ${x.affiliation}`
      : x.from
    return new Element('div', { children: [
      new Element('blockquote', { innerHTML: x.text }),
      new Element('cite', { innerHTML })
    ] })
  }) })
] })

/** An array of about pages. */
export default [
  { id: 'about', title: 'General Information', url: '/about', content: about },
  { id: 'corpus', title: 'Corpus Details', url: '/about/corpus', content: corpus },
  { id: 'principles', title: 'Editorial Principles', url: '/about/principles', content: principles },
  { id: 'permissions', title: 'Permissions', url: '/about/permissions', content: permissions },
  { id: 'contact', title: 'Contact Us', url: '/about/contact', content: contact },
  { id: 'support', title: 'Statements of Support', url: '/about/support', content: support }
]
