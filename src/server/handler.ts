import {
  ContentType,
  HttpError,
  Status,
  headers
} from '../../deps.ts'

import * as page from './page.ts'
import * as read from './read.ts'

/** Returns an HTTP response with the favicon. */
export const favicon = async (): Promise<Response> => {
  return new Response(await Deno.readFile('./favicon.ico'), { status: Status.OK, headers: headers('image/ico') })
}

/** Returns an HTTP response with the home page. */
export const home = async (): Promise<Response> => {
  return new Response(page.home(await read.authors()).toString(), { status: Status.OK, headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with the results of a search query (as JSON). */
export const search = (formData: FormData): Response => {
  return new Response('{"error":"Not yet implemented."}', { status: Status.NotImplemented, headers: headers(ContentType.JSON) })
}

/** Returns an HTTP response with an author page. */
export const author = async (id: string): Promise<Response> => {
  const author = await read.author(id)
  const analysis = await read.analysis(id)
  if (!author || !analysis) {
    throw new HttpError(Status.NotFound, 'Author not found.')
  }
  return new Response(page.author(author, analysis).toString(), { status: Status.OK, headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with a text page. */
export const text = async (id: string): Promise<Response> => {
  const text = await read.text(id, 'html')
  const analysis = await read.analysis(id)
  if (!text || !analysis) {
    throw new HttpError(Status.NotFound, 'Text not found.')
  }
  return new Response(page.text(text, analysis).toString(), { status: Status.OK, headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with a research page. */
export const research = (id: 'research' | 'similarity' | 'topics'): Response => {
  return new Response(page.research(id).toString(), { status: Status.OK, headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with an about page. */
export const about = async (id: 'about' | 'corpus' | 'principles' | 'permissions' | 'contact' | 'support'): Promise<Response> => {
  return (id === 'corpus')
    ? new Response(page.corpus(await read.authors()).toString(), { status: Status.OK, headers: headers(ContentType.HTML) })
    : new Response(page.about(id).toString(), { status: Status.OK, headers: headers(ContentType.HTML) })
}

/** Returns an HTTP response with a JavaScript file. */
export const javascript = async (path: string): Promise<Response> => {
  const actualPath = `./build/${path}`
  try {
    return new Response(await Deno.readTextFile(actualPath), { status: Status.OK, headers: headers(ContentType.JavaScript) })
  } catch {
    throw new HttpError(Status.NotFound, 'Javascript file not found.')
  }
}

/** Returns an HTTP error response. */
export const error = (error: unknown): Response => {
  const httpError = error instanceof HttpError ? error : new HttpError(500, 'Internal server error')
  console.error(httpError)
  console.log(httpError.stack)
  return new Response(page.error(httpError).toString(), { status: httpError.status, headers: headers(ContentType.HTML) })
}
