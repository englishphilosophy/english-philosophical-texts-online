import {
  assertEquals,
  assertThrowsAsync,
  mockRequest
} from '../../test_deps.ts'

import {
  HttpError,
} from '../../deps.ts'

import app from '../../src/server/app.ts'
import * as handler from '../../src/server/handler.ts'
import * as read from '../../src/server/read.ts'

Deno.test({
  name: 'app /favicon.ico',
  async fn () {
    const request = mockRequest('GET', '/favicon.ico')
    const response = await app(request)
    assertEquals(response, await handler.favicon())
  }
})

Deno.test({
  name: 'app /',
  async fn () {
    const request = mockRequest('GET', '/')
    const response = await app(request)
    assertEquals(response, await handler.home())
  }
})

Deno.test({
  name: 'app /search',
  async fn () {
    assertThrowsAsync(async () => {
      const request = mockRequest('GET', '/search')
      await app(request)
    }, HttpError, 'Search requests must be sent with the POST method.')
    // TODO post request test
  }
})

Deno.test({
  name: 'app /texts/{author}',
  async fn () {
    for (const author of await read.authors()) {
      const path = author.id.toLowerCase()
      const request = mockRequest('GET', `/texts/${path}`)
      const response = await app(request)
      assertEquals(response, await handler.author(path))
    }
  }
})

Deno.test({
  name: 'app /texts/{author}/{text}',
  async fn () {
    for (const author of await read.authors()) {
      for (const text of author.texts) {
        const path = text.id.toLowerCase().replace(/\./g, '/')
        const request = mockRequest('GET', `/texts/${path}`)
        const response = await app(request)
        assertEquals(response, await handler.text(path))
      }
    }
  }
})

Deno.test({
  name: 'app /research',
  async fn () {
    const request1 = mockRequest('GET', 'research')
    const response1 = await app(request1)
    assertEquals(response1, await handler.research('research'))

    const request2 = mockRequest('GET', 'research/similarity')
    const response2 = await app(request2)
    assertEquals(response2, await handler.research('similarity'))

    const request3 = mockRequest('GET', 'research/topics')
    const response3 = await app(request3)
    assertEquals(response3, await handler.research('topics'))
  }
})

Deno.test({
  name: 'app /about',
  async fn () {
    const request1 = mockRequest('GET', 'about')
    const response1 = await app(request1)
    assertEquals(response1, await handler.about('about'))

    const request2 = mockRequest('GET', 'about/corpus')
    const response2 = await app(request2)
    assertEquals(response2, await handler.about('corpus'))

    const request3 = mockRequest('GET', 'about/principles')
    const response3 = await app(request3)
    assertEquals(response3, await handler.about('principles'))

    const request4 = mockRequest('GET', 'about/permissions')
    const response4 = await app(request4)
    assertEquals(response4, await handler.about('permissions'))

    const request5 = mockRequest('GET', 'about/contact')
    const response5 = await app(request5)
    assertEquals(response5, await handler.about('contact'))

    const request6 = mockRequest('GET', 'about/support')
    const response6 = await app(request6)
    assertEquals(response6, await handler.about('support'))
  }
})

Deno.test({
  name: 'app /js',
  async fn () {
    const request = mockRequest('GET', '/js/client/app.js')
    const response = await app(request)
    assertEquals(response, await handler.javascript('client/app.js'))

    assertThrowsAsync(async () => {
      const request = mockRequest('GET', '/js/foo/bar/baz.js')
      await app(request)
    }, HttpError, 'Javascript file not found.')
  }
})

Deno.test({
  name: 'app /data',
  async fn () {
    const request = mockRequest('GET', '/data/html/hume.json')
    const response = await app(request)
    assertEquals(response, await handler.json('html/hume.json'))

    assertThrowsAsync(async () => {
      const request = mockRequest('GET', '/data/foo/bar/baz.json')
      await app(request)
    }, HttpError, 'JSON file not found.')
  }
})

Deno.test({
  name: 'app 404',
  async fn () {
    assertThrowsAsync(async () => {
      const request = mockRequest('GET', '/foo/bar/baz')
      await app(request)
    }, HttpError, 'Page not found.')
  }
})
