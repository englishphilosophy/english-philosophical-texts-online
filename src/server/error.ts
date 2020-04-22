import {
  Element,
  HttpError,
  HtmlResponse
} from '../../deps.ts'
import Page from '../view/page.ts'

export default function errorHandler (error: HttpError): HtmlResponse {
  return new Page('error', [
    new Element('h1', { innerHTML: `${error.status} Error` }),
    new Element('p', { innerHTML: error.message })
  ])
}
