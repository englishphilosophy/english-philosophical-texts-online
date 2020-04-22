import {
  Element,
  Request,
  HtmlResponse
} from '../../deps.ts'
import Page from '../view/page.ts'

export default function index (request: Request): HtmlResponse {
  return new Page('Compare', [
    new Element('h1', { innerHTML: 'Compare' })
  ])
}
