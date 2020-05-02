import {
  HttpError,
  Request,
  HtmlResponse,
  Status
} from '../../deps.ts'

import ReaderPage from '../pages/reader_page.ts'
import * as read from './read.ts'
import * as details from '../elements/details.ts'
import * as links from '../elements/links.ts'
import toc from '../elements/toc.ts'
import blocks from '../elements/blocks.ts'
import * as usageElement from '../elements/usage.ts'

export function index (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2)

  if (urlBits.length === 1) {
    const author = read.author(urlBits[0])
    if (!author) {
      throw new HttpError(Status.NotFound, 'Author not found.')
    }
    return new ReaderPage({
      ancestors: [author],
      title: [details.author(author), links.author(author, 'Works')],
      content: [toc(author)]
    })
  }

  const text = read.text(urlBits.join('/'), 'html')
  if (!text || !text.imported) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new ReaderPage({
    ancestors: read.ancestors(text.id),
    title: [blocks(text.blocks.slice(0, 1)), links.text(text, 'Text')],
    content: text.texts.length ? [toc(text)] : [blocks(text.blocks.slice(1))]
  })
}

export function usage (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2, -1)

  if (urlBits.length === 1) {
    const author = read.author(urlBits[0])
    const analysis = read.analysis(urlBits[0])
    if (!author || !analysis) {
      throw new HttpError(Status.NotFound, 'Author not found.')
    }
    return new ReaderPage({
      ancestors: [author],
      title: [details.author(author), links.author(author, 'Usage')],
      content: [usageElement.usage(analysis)]
    })
  }

  const text = read.text(urlBits.join('/'), 'html')
  const analysis = read.analysis(urlBits.join('/'))
  if (!text || !text.imported || !analysis) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new ReaderPage({
    ancestors: read.ancestors(text.id),
    title: [blocks(text.blocks.slice(0, 1)), links.text(text, 'Usage')],
    content: [usageElement.usage(analysis)]
  })
}

export function about (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2, -1)

  if (urlBits.length === 1) {
    throw new HttpError(Status.NotFound, 'Page not found.')
  }

  const text = read.text(urlBits.join('/'), 'html')
  if (!text || !text.imported) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new ReaderPage({
    ancestors: read.ancestors(text.id),
    title: [blocks(text.blocks.slice(0, 1)), links.text(text, 'About')],
    content: [details.text(text)]
  })
}
