import {
  exists,
  HttpError,
  HtmlResponse,
  JavascriptResponse,
  JsonResponse,
  OkResponse,
  Status
} from '../../deps.ts'

import * as page from './page.ts'
import * as read from './read.ts'
import * as _search from './search.ts'

/** Returns an HTTP response with the favicon. */
export async function favicon (): Promise<OkResponse> {
  return new OkResponse('image/ico', await Deno.readFile('./favicon.ico'))
}

/** Returns an HTTP response with the home page. */
export async function home (): Promise<HtmlResponse> {
  return new HtmlResponse(page.home(await read.authors()))
}

/** Returns an HTTP response with the results of a search query (as JSON). */
export async function search (params: URLSearchParams): Promise<JsonResponse> {
  const id = params.get('id')
  const query1 = _search.parseQuery(params.get('query11'), params.get('query12'), params.get('query1op'))
  const query2 = _search.parseQuery(params.get('query21'), params.get('query22'), params.get('query2op'))
  const query = _search.parseQuery(query1, query2, 'bot')

  if (!id || !query) {
    throw new HttpError(500, 'Bad query body.')
  }

  const options = {
    ignorePunctuation: (params.get('ignorePunctuation') === 'on'),
    wholeWords: (params.get('wholeWords') === 'on'),
    variantSpellings: (params.get('variantSpellings') === 'on')
  }

  return new JsonResponse(await _search.runQuery([id], query, options))
}

/** Returns an HTTP response with an author page. */
export async function author (id: string): Promise<HtmlResponse> {
  const author = await read.author(id)
  const analysis = await read.analysis(id)
  if (!author || !analysis) {
    throw new HttpError(Status.NotFound, 'Author not found.')
  }
  return new HtmlResponse(page.author(author, analysis))
}

/** Returns an HTTP response with a text page. */
export async function text (id: string): Promise<HtmlResponse> {
  const text = await read.text(id, 'html')
  const analysis = await read.analysis(id)
  if (!text || !analysis) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  const ancestors = await read.ancestors(text.id)
  const previous = await read.previous(text.id)
  const next = await read.next(text.id)  
  return new HtmlResponse(page.text(text, analysis, ancestors, previous, next))
}

/** Returns an HTTP response with a research page. */
export function research (id: 'research'|'similarity'|'topics'): HtmlResponse {
  return new HtmlResponse(page.research(id))
}

/** Returns an HTTP response with an about page. */
export async function about (id: 'about'|'corpus'|'principles'|'permissions'|'contact'|'support'): Promise<HtmlResponse> {
  return (id === 'corpus')
    ? new HtmlResponse(page.corpus(await read.authors()))
    : new HtmlResponse(page.about(id))
}

/** Returns an HTTP response with a JavaScript file. */
export async function javascript (path: string): Promise<JavascriptResponse> {
  path = './build/' + path
  if (!await exists(path)) {
    throw new HttpError(Status.NotFound, 'Javascript file not found.')
  }
  return new JavascriptResponse(await Deno.readTextFile(path))
}

/** Returns an HTTP response with some textual data (as JSON). */
export async function json (path: string): Promise<JsonResponse> {
  path = '../english-philosophical-texts/build/' + path
  if (!await exists(path)) {
    path = path.replace(/\.json$/, '/index.json')
  }
  if (!await exists(path)) {
    throw new HttpError(Status.NotFound, 'JSON file not found.')
  }
  return new JsonResponse(await Deno.readTextFile(path))
}

/** Returns an HTTP error response. */
export function error (error: HttpError): HtmlResponse {
  const response = new HtmlResponse(page.error(error))
  response.status = error.status
  return response
}
