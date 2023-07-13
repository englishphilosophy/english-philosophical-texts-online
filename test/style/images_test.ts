import { assertEquals } from "testing";
import * as images from "../../src/style/images.ts";

Deno.test({
  name: "src/style/images",
  fn() {
    assertEquals(typeof images.leviathan, "string");
  },
});
