import type { Author, Text, TextStub } from "ept/library";
import { type Element, element } from "elementary";
import * as misc from "./misc.ts";

export default (text: Author | Text): Element => {
  return element("ul", {
    class: "section-content toc",
    children: text.texts.map(tocEntry),
  });
};

const tocEntry = (textStub: TextStub): Element => {
  return element("li", {
    innerHTML: textStub.imported ? misc.link(textStub) : misc.title(textStub),
  });
};
