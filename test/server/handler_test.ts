import {
  assert,
  assertEquals
} from '../../test_deps.ts'

import {
  Response,
  Status
} from '../../deps.ts'

import * as handler from '../../src/server/handler.ts'
import * as read from '../../src/server/read.ts'

Deno.test({
  name: 'server/handler:favicon',
  async fn () {
    const response = await handler.favicon()
    assert(response instanceof Response)
    assertEquals(response.status, Status.OK)
    assertEquals(response.headers.get('content-type'), 'image/ico')
  }
})

Deno.test({
  name: 'server/handler:home',
  async fn () {
    const response = await handler.home()
    assert(response instanceof Response)
    assertEquals(response.status, Status.OK)
    assertEquals(response.headers.get('content-type'), 'text/html')
  }
})

Deno.test({
  name: 'server/handler:search',
  async fn () {
    // TODO
  }
})

Deno.test({
  name: 'server/handler:author',
  async fn () {
    for (const author of await read.authors()) {
      const response = await handler.author(author.id)
      assert(response instanceof Response)
      assertEquals(response.status, Status.OK)
      assertEquals(response.headers.get('content-type'), 'text/html')
    }
  }
})

Deno.test({
  name: 'server/handler:text',
  async fn () {
    for (const author of await read.authors()) {
      for (const text of author.texts) {
        const response = await handler.text(text.id)
        assert(response instanceof Response)
        assertEquals(response.status, Status.OK)
        assertEquals(response.headers.get('content-type'), 'text/html')
      }
    }
  }
})

Deno.test({
  name: 'server/handler:research',
  async fn () {
    // TODO
  }
})

Deno.test({
  name: 'server/handler:about',
  async fn () {
    // TODO
  }
})

Deno.test({
  name: 'server/handler:javascript',
  async fn () {
    // TODO
  }
})

Deno.test({
  name: 'server/handler:json',
  async fn () {
    // TODO
  }
})

Deno.test({
  name: 'server/handler:error',
  async fn () {
    // TODO
  }
})
