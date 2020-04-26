import {
  Author
} from '../../deps.ts'
  
import Page from './page.ts'
// import summary from '../elements/summary.ts'
import controls from '../elements/controls.ts'
import library from '../elements/library.ts'
  
export default class HomePage extends Page {
  constructor (authors: Author[]) {
    super({ section: 'Texts', nav: [controls()], main: [library(authors)] })
  }
}
