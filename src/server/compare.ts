import {
  Element,
  Request,
  HtmlResponse
} from '../../deps.ts'
import Page from '../pages/page.ts'

export default function index (request: Request): HtmlResponse {
  return new Page({ section: 'Compare', main: [
    new Element('h1', { innerHTML: 'Compare' })
  ] })
}
