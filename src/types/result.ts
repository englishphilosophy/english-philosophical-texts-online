import type { Block } from "ept/library";

/** A search result. */
export type Result = {
  id: string;
  title: string;
  blocks: Block[];
  results: Result[];
  total: number;
};
