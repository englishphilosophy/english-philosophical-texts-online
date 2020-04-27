import {
  HttpError,
  Request,
  HtmlResponse,
  Status
} from '../../deps.ts'

import ReaderPage from '../pages/reader_page.ts'
import * as read from './read.ts'

export function index (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2)

  if (urlBits.length === 1) {
    const author = read.author(urlBits[0])
    if (!author) {
      throw new HttpError(Status.NotFound, 'Author not found.')
    }
    return new ReaderPage({ type: 'Author', value: author }, [author])
  }

  const text = read.text(urlBits.join('/'), 'html')
  if (!text || !text.imported) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new ReaderPage({type: 'Text', value: text }, read.ancestors(text.id))
}

export function usage (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2, -1)

  if (urlBits.length === 1) {
    const author = read.author(urlBits[0])
    const analysis = read.analysis(urlBits[0])
    if (!author || !analysis) {
      throw new HttpError(Status.NotFound, 'Author not found.')
    }
    return new ReaderPage({ type: 'Author', value: author }, [author], analysis)
  }

  const text = read.text(urlBits.join('/'), 'html')
  const analysis = read.analysis(urlBits.join('/'))
  if (!text || !text.imported || !analysis) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new ReaderPage({ type: 'Text', value: text }, read.ancestors(text.id), analysis)
}

export function about (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2, -1)

  if (urlBits.length === 1) {
    throw new HttpError(Status.NotFound, 'Author not found.')
  }

  const text = read.text(urlBits.join('/'), 'html')
  if (!text || !text.imported) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new ReaderPage({type: 'About', value: text }, read.ancestors(text.id))
}
