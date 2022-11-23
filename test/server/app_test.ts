import {
  assertEquals,
  assertRejects,
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
    const request = new Request('https://localhost/favicon.ico', { method: 'GET' })
    const response = await app(request)
    await assertResponseEquals(response, await handler.favicon())
  }
})

Deno.test({
  name: 'app /',
  async fn () {
    const request = new Request('https://localhost/', { method: 'GET' })
    const response = await app(request)
    assertResponseEquals(response, await handler.home())
  }
})

Deno.test({
  name: 'app /search',
  fn () {
    assertRejects(async () => {
      const request = new Request('https://localhost/search', { method: 'GET' })
      await app(request)
    }, HttpError, 'Search requests must be sent with the POST method.')
    // TODO post request test
  }
})

for (const author of await read.authors()) {
  Deno.test({
    name: `app /texts/${author.id}`,
    async fn () {
      const path = author.id.toLowerCase()
      const request = new Request(`https://localhost/texts/${path}`, { method: 'GET' })
      const response = await app(request)
      assertResponseEquals(response, await handler.author(path))
    }
  })
}

for (const author of await read.authors()) {
  for (const text of author.texts) {
    Deno.test({
      name: `app /texts/${author.id}/${text.id}`,
      async fn () {
        const path = text.id.toLowerCase().replace(/\./g, '/')
        const request = new Request(`https://localhost/texts/${path}`, { method: 'GET' })
        const response = await app(request)
        assertResponseEquals(response, await handler.text(path))
      }
    })
  }
}

Deno.test({
  name: 'app /research',
  async fn () {
    const request1 = new Request('https://localhost/research', { method: 'GET' })
    const response1 = await app(request1)
    assertResponseEquals(response1, handler.research('research'))

    const request2 = new Request('https://localhost/research/similarity', { method: 'GET' })
    const response2 = await app(request2)
    assertResponseEquals(response2, handler.research('similarity'))

    const request3 = new Request('https://localhost/research/topics', { method: 'GET' })
    const response3 = await app(request3)
    assertResponseEquals(response3, handler.research('topics'))
  }
})

Deno.test({
  name: 'app /about',
  async fn () {
    const request1 = new Request('https://localhost/about', { method: 'GET' })
    const response1 = await app(request1)
    assertResponseEquals(response1, await handler.about('about'))

    const request2 = new Request('https://localhost/about/corpus', { method: 'GET' })
    const response2 = await app(request2)
    assertResponseEquals(response2, await handler.about('corpus'))

    const request3 = new Request('https://localhost/about/principles', { method: 'GET' })
    const response3 = await app(request3)
    assertResponseEquals(response3, await handler.about('principles'))

    const request4 = new Request('https://localhost/about/permissions', { method: 'GET' })
    const response4 = await app(request4)
    assertResponseEquals(response4, await handler.about('permissions'))

    const request5 = new Request('https://localhost/about/contact', { method: 'GET' })
    const response5 = await app(request5)
    assertResponseEquals(response5, await handler.about('contact'))

    const request6 = new Request('https://localhost/about/support', { method: 'GET' })
    const response6 = await app(request6)
    assertResponseEquals(response6, await handler.about('support'))
  }
})

Deno.test({
  name: 'app /js',
  async fn () {
    const request = new Request('https://localhost/js/client/app.js', { method: 'GET' })
    const response = await app(request)
    assertResponseEquals(response, await handler.javascript('client/app.js'))

    assertRejects(async () => {
      const request = new Request('https://localhost/js/foo/bar/baz.js', { method: 'GET' })
      await app(request)
    }, HttpError, 'Javascript file not found.')
  }
})

Deno.test({
  name: 'app 404',
  fn () {
    assertRejects(async () => {
      const request = new Request('https://localhost/foo/bar/baz', { method: 'GET' })
      await app(request)
    }, HttpError, 'Page not found.')
  }
})

const assertResponseEquals = async (actual: Response, expected: Response): Promise<void> => {
  actual.headers.delete("date")
  expected.headers.delete("date")
  assertEquals(actual.headers, expected.headers)
  assertEquals(actual.status, expected.status)
  assertEquals((await actual.blob()).size, (await expected.blob()).size)
}
