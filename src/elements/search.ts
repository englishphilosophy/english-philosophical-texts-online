import type { Block } from "ept/library";
import { type Element, element } from "elementary";
import type { Result } from "../types/result.ts";
import blocks from "./blocks.ts";

export const search = (id: string): Element => {
  return element("div", {
    class: "section-content search",
    children: [form(id), resultsPlaceholder],
  });
};

export const results = (result?: Result): Element => {
  if (!result) {
    return element("div", {
      class: "results",
      innerHTML: "No paragraphs matched your search criteria.",
    });
  }
  return element("div", {
    class: "results",
    children: [displayResult(result)],
  });
};

const form = (id: string): Element => {
  return element("form", {
    class: "search-form",
    children: [
      element("input", { type: "hidden", name: "id", value: id }),
      query(1, "For paragraphs that contain:"),
      query(2, "But not:"),
      element("div", {
        class: "group",
        children: [
          element("label", { class: "label", innerHTML: "Options:" }),
          element("div", {
            class: "inputs checkboxes",
            children: [
              element("label", {
                innerHTML:
                  '<input type="checkbox" name="ignorePunctuation" checked> Ignore Punctuation',
              }),
              element("label", {
                innerHTML:
                  '<input type="checkbox" name="wholeWords" checked> Match Whole Words',
              }),
              element("label", {
                innerHTML:
                  '<input type="checkbox" name="variantSpellings" checked> Match Variant Spellings',
              }),
            ],
          }),
        ],
      }),
      element("div", {
        class: "group buttons",
        children: [element("button", { type: "submit", innerHTML: "Search" })],
      }),
    ],
  });
};

const query = (id: number, label: string): Element => {
  return element("div", {
    class: "group",
    children: [
      element("label", {
        class: "label",
        for: `query${id}1`,
        innerHTML: label,
      }),
      element("div", {
        class: "inputs",
        children: [
          element("input", {
            type: "text",
            name: `query${id}1`,
            id: `query${id}1`,
            "aria-label": `Query ${id} first term`,
            required: id === 1 ? "required" : undefined,
          }),
          element("select", {
            name: `query${id}op`,
            "aria-label": `Query ${id} operator`,
            children: [
              element("option", { value: "and", innerHTML: "AND" }),
              element("option", { value: "or", innerHTML: "OR" }),
            ],
          }),
          element("input", {
            type: "text",
            name: `query${id}2`,
            "aria-label": `Query ${id} second term`,
          }),
        ],
      }),
    ],
  });
};

const resultsPlaceholder = element("div", { class: "results hidden" });

const displayResult = (result: Result): Element => {
  const children = [
    element("h4", { class: "title", innerHTML: result.title }),
    element("p", {
      class: "total",
      innerHTML: `${result.total} matching paragraphs`,
      onclick:
        "event.currentTarget.nextElementSibling.classList.toggle('active')",
    }),
  ];
  if (result.blocks.length > 0) {
    // results come from JSON send to the browser, so blocks won't be instances of
    // the block class
    children.push(
      element("div", { class: "results", children: [blocks(result.blocks)] })
    );
  }
  if (result.results.length > 0) {
    children.push(
      element("div", {
        class: "results",
        children: result.results.map(displayResult),
      })
    );
  }
  return element("div", { class: "result", children });
};
