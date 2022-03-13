import {
  ContentType,
  HttpError,
  Status,
  headers
} from '../../deps.ts'

import * as page from './page.ts'
import * as read from './read.ts'
import * as _search from './search.ts'

/** Returns an HTTP response with the favicon. */
export async function favicon (): Promise<Response> {
  return new Response(await Deno.readFile('./favicon.ico'), { headers: headers('image/ico') })
}

/** Returns an HTTP response with the home page. */
export function home (): Response {
  return new Response(page.home(read.authors()).toString(), { headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with the results of a search query (as JSON). */
export function search (formData: FormData): Response {
  const id = formData.get('id') as string
  const query1 = _search.parseQuery(formData.get('query11') as string, formData.get('query12') as string, formData.get('query1op') as string)
  const query2 = _search.parseQuery(formData.get('query21') as string, formData.get('query22') as string, formData.get('query2op') as string)
  const query = _search.parseQuery(query1, query2, 'bot')

  if (!id || !query) {
    throw new HttpError(500, 'Bad query body.')
  }

  const options = {
    ignorePunctuation: (formData.get('ignorePunctuation') === 'on'),
    wholeWords: (formData.get('wholeWords') === 'on'),
    variantSpellings: (formData.get('variantSpellings') === 'on')
  }

  return new Response(JSON.stringify(_search.runQuery([id], query, options)), { headers: headers(ContentType.JSON) })
}

/** Returns an HTTP response with an author page. */
export function author (id: string): Response {
  const author = read.author(id)
  const analysis = read.analysis(id)
  if (!author || !analysis) {
    throw new HttpError(Status.NotFound, 'Author not found.')
  }
  return new Response(page.author(author, analysis).toString(), { headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with a text page. */
export function text (id: string): Response {
  const text = read.text(id, 'html')
  const analysis = read.analysis(id)
  if (!text || !analysis) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  const ancestors = read.ancestors(text.id)
  const previous = read.previous(text.id)
  const next = read.next(text.id)  
  return new Response(page.text(text, analysis, ancestors, previous, next).toString(), { headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with a research page. */
export function research (id: 'research'|'similarity'|'topics'): Response {
  return new Response(page.research(id).toString(), { headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with an about page. */
export function about (id: 'about'|'corpus'|'principles'|'permissions'|'contact'|'support'): Response {
  return (id === 'corpus')
    ? new Response(page.corpus(read.authors()).toString(), { headers: headers(ContentType.HTML) })
    : new Response(page.about(id).toString(), { headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with a JavaScript file. */
export async function javascript (path: string): Promise<Response> {
  path = './build/' + path
  try {
    return new Response(await Deno.readTextFile(path), { headers: headers(ContentType.JavaScript) })
  } catch {
    throw new HttpError(Status.NotFound, 'Javascript file not found.')
  }
}

/** Returns an HTTP response with some textual data (as JSON). */
export async function json (path: string): Promise<Response> {
  path = './texts/' + path
  try {
    return new Response(await Deno.readTextFile(path), { headers: headers(ContentType.JSON) })
  } catch {
    path = path.replace(/\.json$/, '/index.json')
    try {
      return new Response(await Deno.readTextFile(path), { headers: headers(ContentType.JSON) })
    } catch {
      throw new HttpError(Status.NotFound, 'JSON file not found.')
    }
  }
}

/** Returns an HTTP error response. */
export function error (error: unknown): Response {
  const httpError = error instanceof HttpError ? error : new HttpError(500, 'Internal server error')
  console.error(httpError)
  console.log(httpError.stack)
  return new Response(page.error(httpError).toString(), { status: httpError.status, headers: headers(ContentType.HTML) })
}
