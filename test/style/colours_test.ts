import { assertEquals } from "testing";
import * as colours from "../../src/style/colours.ts";

Deno.test({
  name: "src/style/colours",
  fn() {
    assertEquals(typeof colours.blue, "string");
    assertEquals(typeof colours.white, "string");
    assertEquals(typeof colours.beige, "string");
    assertEquals(typeof colours.lightgray, "string");
    assertEquals(typeof colours.mediumgray, "string");
    assertEquals(typeof colours.gray, "string");
    assertEquals(typeof colours.darkgray, "string");
    assertEquals(typeof colours.black, "string");
    assertEquals(typeof colours.transblack, "string");
  },
});
