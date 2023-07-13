import { assert, assertEquals } from "testing";
import { Element } from "elementary";
import page from "../../src/style/page.ts";

Deno.test({
  name: "src/style/page",
  fn() {
    const element = page({
      section: "Texts",
      main: [],
    });
    assert(element instanceof Element);
    assertEquals(element.tagName, "html");
  },
});
