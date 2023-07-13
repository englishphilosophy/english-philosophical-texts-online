import type { Analysis } from "ept/analysis";
import type { Author, Text } from "ept/library";
import { Element } from "elementary";
import { HttpError } from "womble";
import layout from "../style/page.ts";
import controls from "../elements/controls.ts";
import library from "../elements/library.ts";
import * as reader from "../elements/reader.ts";
import breadcrumb from "../elements/breadcrumb.ts";
import * as aboutContent from "../content/about.ts";
import * as researchContent from "../content/research.ts";
import info from "../elements/info.ts";

/** Creates HTML for the home page. */
export const home = (authors: Author[]): Element => {
  return layout({
    section: "Texts",
    bodyClass: "home",
    nav: [controls],
    main: [library(authors)],
  });
};

/** Creates HTML for an author page. */
export const author = (author: Author, analysis: Analysis): Element => {
  return layout({
    section: "Texts",
    main: [reader.author(author, analysis)],
    nav: [breadcrumb([author])],
  });
};

/** Creates HTML for a text page. */
export const text = (text: Text, analysis: Analysis): Element => {
  return layout({
    section: "Texts",
    main: [reader.text(text, analysis)],
    nav: [breadcrumb(text.ancestors, text.prev, text.next)],
  });
};

/** Creates HTML for a research page. */
export const research = (id: "research" | "similarity" | "topics"): Element => {
  return layout({
    section: "Research",
    nav: [
      new Element("hgroup", {
        children: [
          new Element("h1", {
            innerHTML: `Research: ${researchContent.titles[id]}`,
          }),
        ],
      }),
    ],
    main: [info(id, researchContent.pages, researchContent[id])],
  });
};

/** Creates HTML for an about page. */
export const about = (
  id: "about" | "principles" | "permissions" | "contact" | "support"
): Element => {
  return layout({
    section: "About",
    nav: [
      new Element("hgroup", {
        children: [
          new Element("h1", { innerHTML: `About: ${aboutContent.titles[id]}` }),
        ],
      }),
    ],
    main: [info(id, aboutContent.pages, aboutContent[id])],
  });
};

/** Creates HTML for the corpus page. */
export const corpus = (authors: Author[]): Element => {
  return layout({
    section: "About",
    nav: [
      new Element("hgroup", {
        children: [
          new Element("h1", {
            innerHTML: `About: ${aboutContent.titles.corpus}`,
          }),
        ],
      }),
    ],
    main: [info("corpus", aboutContent.pages, aboutContent.corpus(authors))],
  });
};

/** Creates HTML for an error page. */
export const error = (error: HttpError): Element => {
  return layout({
    section: "Error",
    main: [
      new Element("h1", { innerHTML: `${error.status} Error` }),
      new Element("p", { innerHTML: error.message }),
    ],
  });
};
