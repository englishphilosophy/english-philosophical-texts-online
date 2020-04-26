import {
  Element,
  Block,
  Text
} from '../../deps.ts'

import Page from './page.ts'
import breadcrumb from '../elements/breadcrumb.ts'
import reader from '../elements/reader.ts'

export default class TextPage extends Page {
  constructor (text: Text, ancestors: Text[]) {
    const children = text.imported
      ? [reader(text)]
      : [new Element('p', 'This text has not yet been imported.')]

    super({ section: 'Texts', main: children, nav: [breadcrumb(ancestors)] })
  }
}
