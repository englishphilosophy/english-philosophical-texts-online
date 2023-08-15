import { type Data, isBlock } from "ept/types";

/** Create the (local) URL for an author, text, or block. */
export default (data: Data): string =>
  isBlock(data) && data.type !== "title"
    ? `/${
      data.id
        .toLowerCase()
        .replace(/\.([^\.]*)$/, "#$1")
        .replace(/\./g, "/")
    }`
    : `/${data.id.toLowerCase().replace(/\./g, "/")}`;
