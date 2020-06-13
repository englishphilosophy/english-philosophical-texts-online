import {
  assertEquals
} from '../../test_deps.ts'

import css from '../../src/style/css.ts'

Deno.test({
  name: 'src/style/css',
  fn () {
    assertEquals(typeof css, 'string')
  }
})