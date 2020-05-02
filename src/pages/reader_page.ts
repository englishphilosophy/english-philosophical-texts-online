import {
  Element,
  Author,
  Text
} from '../../deps.ts'

import Page from './page.ts'
import breadcrumb from '../elements/breadcrumb.ts'
import reader from '../elements/reader.ts'

type Options = {
  ancestors: (Author|Text)[]
  title: Element[]
  content: Element[]
}

export default class ReaderPage extends Page {
  constructor (options: Options) {
    super({
      section: 'Texts',
      main: [reader(options.title, options.content)],
      nav: [breadcrumb(options.ancestors)] })
  }
}
