import {
  Author,
  Element
} from '../../deps_client.ts'

import * as misc from './misc.ts'

export default function summary (authors: Author[]): Element {
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
    if (index === 0) return misc.authorLink(current)
    if (index === authorsWithTexts.length - 1) return `${sofar}, and ${misc.authorLink(current)}`
    return `${sofar}, ${misc.authorLink(current)}`
  }, '')

  return new Element('p', {
    innerHTML: `Below is a list of ${totalTexts} English-language philosophical texts published in Britain between 1650 and 1830, by ${authors.length} authors (${maleAuthors.length} male and ${femaleAuthors.length} female). Our aim is to provide free and high-quality digital critical editions of all of the works on this list, alongside tools for performing sophisticated searches and comparative textual analyses. Note however that this project is still in the early stages. So far we have prepared ${totalImportedTexts} texts by ${authorsWithTextsList}.`
  })
}
