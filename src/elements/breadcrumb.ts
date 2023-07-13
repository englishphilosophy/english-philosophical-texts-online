import type { Author, Text, TextStub } from "ept/library";
import { type Element, element } from "elementary";
import * as misc from "./misc.ts";

/** Maps ancestors and adjacent texts to an HTML breadcrumb display. */
export default (
  ancestors: [Author, ...TextStub[]],
  prev?: TextStub,
  next?: TextStub
): Element => {
  return element("nav", {
    class: "breadcrumb",
    children: [trail(ancestors), context(prev, next)],
  });
};

/** Maps ancestors of a text to an HTML breadcrumb display. */
const trail = (ancestors: [Author, ...TextStub[]]): Element => {
  return element("div", { class: "trail", children: ancestors.map(crumb) });
};

/** Maps an ancestor of a text to an HTML breadcrumb link. */
const crumb = (data: Author | TextStub): Element => {
  const innerHTML = (data as Text).breadcrumb || data.id;
  return element("div", {
    class: "crumb",
    children: [element("a", { href: misc.url(data), innerHTML })],
  });
};

/** Maps adjacent texts to a previous/next HTML display. */
const context = (prev?: TextStub, next?: TextStub): Element => {
  const prevInnerHTML = prev
    ? `<a href="${misc.url(prev)}">&lt; ${prev.breadcrumb}</a>`
    : "";
  const nextInnerHTML = next
    ? `<a href="${misc.url(next)}">${next.breadcrumb} &gt;</a>`
    : "";
  return element("div", {
    class: "context",
    children: [
      element("div", { class: "prev", innerHTML: prevInnerHTML }),
      element("div", { class: "next", innerHTML: nextInnerHTML }),
    ],
  });
};
