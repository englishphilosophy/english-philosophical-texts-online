import { type Text, type TextStub } from "ept/types";

/** Creates the full display title of a text. */
export default (text: Text | TextStub): string =>
  `${text.title} (${text.published.map((x) => x.toString(10)).join(", ")})`;
