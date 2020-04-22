import {
  Element,
  HttpError,
  Request,
  HtmlResponse,
  Status
} from '../../deps.ts'
import Page from '../view/page.ts'
import * as read from './read.ts'

export default function index (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2)
  return (urlBits.length === 1)
    ? author(urlBits[0])
    : text(urlBits.join('/'))
}

function author (id: string): HtmlResponse {
  const author = read.author(id)

  if (!author) {
    throw new HttpError(Status.NotFound, 'Author not found.')
  }

  return new Page('Texts', [author.element])
}

function text (id: string): HtmlResponse {
  const text = read.text(id)

  if (!text) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }

  return new Page('Texts', [text.element, text.lemmasTable])
}
