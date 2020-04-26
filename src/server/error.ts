import {
  Element,
  HttpError,
  HtmlResponse
} from '../../deps.ts'
import Page from '../pages/page.ts'

export default function errorHandler (error: HttpError): HtmlResponse {
  return new Page({ section: 'Error', main: [
    new Element('h1', { innerHTML: `${error.status} Error` }),
    new Element('p', { innerHTML: error.message })
  ] })
}
