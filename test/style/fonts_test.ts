import {
  assertEquals
} from '../../test_deps.ts'

import * as fonts from '../../src/style/fonts.ts'

Deno.test({
  name: 'src/style/colours',
  fn () {
    assertEquals(typeof fonts.GFSDidot, 'string')
    assertEquals(typeof fonts.IMFell, 'string')
    assertEquals(typeof fonts.IMFellItalic, 'string')
    assertEquals(typeof fonts.IMFellSC, 'string')
    assertEquals(typeof fonts.sans, 'string')
    assertEquals(typeof fonts.old, 'string')
    assertEquals(typeof fonts.oldSC, 'string')
    assertEquals(typeof fonts.greek, 'string')
  }
})