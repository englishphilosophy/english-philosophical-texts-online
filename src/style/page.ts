import { type Element, element } from "elementary";
import type { PageOptions } from "../types/page_options.ts";
import css from "./css.ts";

/** Generates an HTML document with the given options. */
export default function page(options: PageOptions): Element {
  return element("html", {
    lang: "en",
    children: [head(options), body(options)],
  });
}

/** Generate the head element. */
function head(options: PageOptions): Element {
  const title = options.title
    ? `${options.title} - English Philosophical Texts Online`
    : "English Philosophical Texts Online";

  return element("head", {
    children: [
      element("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" }),
      element("meta", {
        "http-equiv": "Content-Type",
        content: "text/html; charset=UTF-8",
      }),
      element("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      element("meta", {
        name: "keywords",
        content:
          "english, philosophy, texts, hobbes, locke, hume, mill, shaftesbury",
      }),
      element("meta", {
        name: "description",
        content:
          "High-quality digital editions of a broad canon of English philosophical texts published between 1650 and 1830.",
      }),
      element("title", { innerHTML: title }),
      element("style", { type: "text/css", innerHTML: css }),
      element("link", { rel: "shortcut icon", href: "/favicon.ico" }),
      element("script", {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=UA-23731986-3",
      }),
      element("script", {
        innerHTML:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-23731986-3');",
      }),
      element("script", {
        defer: true,
        module: true,
        src: "/js/client/app.js",
      }),
    ],
  });
}

/** Generates the body element. */
function body(options: PageOptions): Element {
  return element("body", {
    class: options.bodyClass,
    children: [
      header(options.section),
      nav(options.nav || []),
      main(options.main),
      footer,
    ],
  });
}

/** Generates the header element. */
function header(section: string): Element {
  return element("header", {
    children: [
      element("hgroup", {
        children: [
          element("h1", { innerHTML: "English Philosophical Texts Online" }),
          element("h2", {
            innerHTML:
              "A free online library of early modern English-language philosophical texts",
          }),
        ],
      }),
      element("nav", {
        children: [
          sectionLink("/", "Texts", section),
          sectionLink("/research", "Research", section),
          sectionLink("/about", "About", section),
        ],
      }),
    ],
  });
}

function sectionLink(
  href: string,
  innerHTML: string,
  section: string
): Element {
  const className = section === innerHTML ? "active" : undefined;
  return element("a", { className, href, innerHTML });
}

/** Generates the nav element. */
function nav(children: Element[]): Element {
  return element("nav", { children });
}

/** Generates the main element. */
function main(children: Element[]): Element {
  return element("main", { children: [element("section", { children })] });
}

/** The footer element. */
const footer = element("footer", {
  children: [
    element("section", {
      children: [
        element("p", {
          innerHTML:
            'English Philosophical Texts Online is developed and maintained by <a href="https://merivale.uk">Amyas Merivale</a>, as part of a project run by <a href="">Amyas Merivale</a> and <a href="http://www.millican.org">Peter Millican</a> at the <a href="https://www.philosophy.ox.ac.uk">University of Oxford</a>. All comments and suggestions are welcome.',
        }),
        element("ul", {
          children: [
            element("li", {
              children: [
                element("a", {
                  href: "https://englishphilosophy.org",
                  innerHTML: "English Philosophical Texts Online",
                }),
              ],
            }),
            element("li", {
              children: [
                element("a", {
                  href: "https://davidhume.org",
                  innerHTML: "Hume Texts Online",
                }),
              ],
            }),
            element("li", {
              children: [
                element("a", {
                  href: "https://github.com/englishphilosophy",
                  innerHTML: "Early English Philosophy @ GitHub",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
