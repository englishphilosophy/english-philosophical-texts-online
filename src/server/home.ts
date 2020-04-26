import {
  Request,
  HtmlResponse
} from '../../deps.ts'

import HomePage from '../pages/home_page.ts'
import * as read from './read.ts'

export default function index (request: Request): HtmlResponse {
  const authors = read.authors()

  return new HomePage(authors)
}
