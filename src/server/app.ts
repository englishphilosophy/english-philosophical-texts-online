import {
  HttpError,
  Request,
  Response,
  Status
} from '../../deps.ts'

import * as handler from './handler.ts'

/** The web application. */
export default async function epto (request: Request): Promise<Response> {
  // favicon
  if (request.path === '/favicon.ico') {
    return handler.favicon()
  }

  // home page
  if (request.path === '/') {
    return handler.home()
  }

  // search api
  if (request.path === '/search') {
    if (request.method !== 'POST') {
      throw new HttpError(Status.MethodNotAllowed, 'Search requests must be sent with the POST method.')
    }
    return handler.search(await request.getFormBody())
  }

  // author pages
  const authorTest = request.path.match(/^\/texts\/([a-z]+)$/)
  if (authorTest) {
    return handler.author(authorTest[1])
  }

  // text pages
  const textTest = request.path.match(/^\/texts\/([a-z0-9/]+)$/)
  if (textTest) {
    return handler.text(textTest[1])
  }

  // research pages
  if (request.path === '/research') {
    return handler.research('research')
  }
  if (request.path === '/research/similarity') {
    return handler.research('similarity')
  }
  if (request.path === '/research/topics') {
    return handler.research('topics')
  }

  // about pages
  if (request.path === '/about') {
    return handler.about('about')
  }
  if (request.path === '/about/corpus') {
    return handler.about('corpus')
  }
  if (request.path === '/about/principles') {
    return handler.about('principles')
  }
  if (request.path === '/about/permissions') {
    return handler.about('permissions')
  }
  if (request.path === '/about/contact') {
    return handler.about('contact')
  }
  if (request.path === '/about/support') {
    return handler.about('support')
  }

  // javascript files
  const javascriptTest = request.path.match(/^\/js\/([a-z/]+\.js)$/)
  if (javascriptTest) {
    return handler.javascript(javascriptTest[1])
  }

  // json
  const jsonTest = request.path.match(/^\/data\/([a-z/0-9]+\.json)$/)
  if (jsonTest) {
    return handler.json(jsonTest[1])
  }

  // no matching path
  throw new HttpError(Status.NotFound, 'Page not found.')
}
