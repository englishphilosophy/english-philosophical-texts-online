import {
  HttpError,
  Request,
  HtmlResponse,
  Status
} from '../../deps.ts'

import AuthorPage from '../pages/author_page.ts'
import TextPage from '../pages/text_page.ts'
import * as read from './read.ts'

export default function index (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2)

  if (urlBits.length === 1) {
    const author = read.author(urlBits[0])

    if (!author) {
      throw new HttpError(Status.NotFound, 'Author not found.')
    }

    return new AuthorPage(author)
  } else {
    const text = read.text(urlBits.join('/'), 'html')

    if (!text) {
      throw new HttpError(Status.NotFound, 'Text not found.')
    }
  
    return new TextPage(text, read.ancestors(text.id))
  }
}
