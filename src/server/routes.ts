import {
  existsSync,
  readFileStrSync,
  Element,
  Request,
  HttpError,
  HtmlResponse,
  JavascriptResponse,
  JsonResponse,
  FileResponse,
  Status
} from '../../deps.ts'

import Page from '../style/page.ts'
import controls from '../elements/controls.ts'
import library from '../elements/library.ts'
import breadcrumb from '../elements/breadcrumb.ts'
import context from '../elements/context.ts'
import * as reader from '../elements/reader.ts'
import info from '../elements/info.ts'
import aboutPages from '../content/about.ts'
import researchPages from '../content/research.ts'
import * as read from './read.ts'
import * as searchApi from './search.ts'

/** Returns the favicon. */
export async function favicon (request: Request): Promise<FileResponse> {
  const buffer = await Deno.readFile('favicon.ico')
  return new FileResponse(buffer, 'image/ico')
}

/** Returns the JPG of the frontispiece of the Leviathan. */
export async function leviathan (request: Request): Promise<FileResponse> {
  const buffer = await Deno.readFile('leviathan.jpg')
  return new FileResponse(buffer, 'image/jpg')
}

/** Returns the home page. */
export function home (request: Request): HtmlResponse {
  const authors = read.authors()
  return new Page({ section: 'Texts', nav: [controls()], main: [library(authors)] })
}

/** Returns the page for an author or text (or a 404 error). */
export function text (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(2)
  if (urlBits.length === 1) {
    const author = read.author(urlBits[0])
    const analysis = read.analysis(urlBits[0])
    if (!author || !analysis) {
      throw new HttpError(Status.NotFound, 'Author not found.')
    }
    return new Page({
      section: 'Texts',
      main: [reader.author(author, analysis, ['about', 'works', 'search'])],
      nav: [breadcrumb([author])]
    })
  } else {
    const text = read.text(urlBits.join('/'), 'html')
    const analysis = read.analysis(urlBits.join('/'))
    if (!text || !text.imported || !analysis) {
      throw new HttpError(Status.NotFound, 'Text not found.')
    }
    return new Page({
      section: 'Texts',
      main: [reader.text(text, analysis, ['title', 'content', 'search'])],
      nav: [breadcrumb(read.ancestors(text.id)), context(read.previous(text.id), read.next(text.id))]
    })
  }
}

/** Handles a search request; expects POST params, returns results as JSON. */
export async function search (request: Request): Promise<JsonResponse> {
  const params = await request.postParams()

  const id = params.get('id')
  const query1 = searchApi.parseQuery(params.get('query11'), params.get('query12'), params.get('query1op'))
  const query2 = searchApi.parseQuery(params.get('query21'), params.get('query22'), params.get('query2op'))
  const query = searchApi.parseQuery(query1, query2, 'bot')

  if (!id || !query) {
    throw new HttpError(500, 'Bad query body.')
  }

  const options = {
    ignorePunctuation: (params.get('ignorePunctuation') === 'on'),
    wholeWords: (params.get('wholeWords') === 'on'),
    variantSpellings: (params.get('variantSpellings') === 'on')
  }

  return new JsonResponse(searchApi.runQuery([id], query, options))
}

/** Returns an about page (or a 404 error). */
export function about (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(1)
  const pageId = urlBits[1] || urlBits[0]
  for (const page of aboutPages) {
    if (pageId === page.id) {
      const content = (typeof page.content === 'function')
        ? page.content(read.authors())
        : page.content
      return new Page({
        section: 'About',
        nav: [new Element('h1', { innerHTML: page.title })],
        main: [info(pageId, aboutPages, content)]
      })
    }
  }
  throw new HttpError(Status.NotFound, 'Page not found.')
}

/** Returns a research page. */
export function research (request: Request): HtmlResponse {
  const urlBits = request.path.split('/').slice(1)
  const pageId = urlBits[1] || urlBits[0]
  for (const page of researchPages) {
    if (pageId === page.id) {
      return new Page({
        section: 'Research',
        nav: [new Element('h1', { innerHTML: page.title })],
        main: [info(pageId, researchPages, page.content)]
      })
    }
  }
  throw new HttpError(Status.NotFound, 'Page not found.')
}

/** Returns any JSON from the `data` directory (or a 404 error). */
export function data (request: Request): JsonResponse {
  let path = request.path.replace(/^\/data/, '../english-philosophical-texts/build')
  if (!existsSync(path)) {
    path = path.replace(/\.json$/, '/index.json')
  }
  if (!existsSync(path)) {
    throw new HttpError(404, 'File not found.')
  }
  return new JsonResponse(readFileStrSync(path))
}

/** Returns any TS file from the `src` directory, bundled as JS (or a 404 error) */
export async function javascript (request: Request): Promise<JavascriptResponse> {
  const filePath = request.path.replace(/^\/js/, './src').replace(/\.js$/, '.ts')
  if (!existsSync(filePath)) {
    throw new HttpError(404, 'File not found.')
  }
  const compilerOptions = { lib: ['dom', 'es6', 'es2017'], removeComments: true }
  const [diagnostics, javascript] = await Deno.bundle(filePath, undefined, compilerOptions)
  if (diagnostics) {
    throw new HttpError(500, `<p>Bad javascript.</p> <pre>${JSON.stringify(diagnostics, null, 2)}</pre>`)
  }
  return new JavascriptResponse(javascript)
}

/** Renders an error as an HTML page. */
export function error (error: HttpError): HtmlResponse {
  const response = new Page({ section: 'Error', main: [
    new Element('h1', { innerHTML: `${error.status} Error` }),
    new Element('p', { innerHTML: error.message })
  ] })
  response.status = error.status
  return response
}
