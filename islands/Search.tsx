import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { Query, SearchOptions, SearchResult } from "ept/types";
import { fetchSearchResults } from "../utils/read.ts";
import QueryInput from "../islands/Query.tsx";
import Results from "../islands/Results.tsx";

type Props = {
  id: string;
};

type SearchQuery = {
  query1: string;
  query2: string;
  operator: "and" | "or";
};

type SearchStatus =
  | { tag: "not-asked" }
  | { tag: "loading" }
  | { tag: "success"; result: SearchResult }
  | { tag: "failure"; error: Error };

export default ({ id }: Props) => {
  const searchStatus = useSignal<SearchStatus>({ tag: "not-asked" });

  const options = useRef<SearchOptions>({
    ignorePunctuation: true,
    wholeWords: true,
    variantSpellings: true,
  });
  const query1 = useRef<SearchQuery>({
    query1: "",
    query2: "",
    operator: "and",
  });
  const query2 = useRef<SearchQuery>({
    query1: "",
    query2: "",
    operator: "and",
  });

  const search = async () => {
    const query = prepareQuery(query1.current, query2.current);
    if (query) {
      searchStatus.value = { tag: "loading" };
      const searchResults = await fetchSearchResults({
        ids: [id],
        query,
        options: options.current,
      });
      if (searchResults.ok) {
        searchStatus.value = {
          tag: "success",
          result: searchResults.result[0],
        };
      } else {
        searchStatus.value = {
          tag: "failure",
          error: new Error("Search failed."),
        };
      }
    }
  };

  return (
    <div className="section-content search">
      <div className="search-form">
        <QueryInput
          id={1}
          label="For paragraphs that contain:"
          query={query1.current}
        />
        <QueryInput id={2} label="But not:" query={query2.current} />
        <div className="group">
          <label className="label">Options:</label>
          <div className="inputs checkboxes">
            <label>
              <input
                type="checkbox"
                name="ignorePunctuation"
                checked={true}
                onChange={(event) =>
                  options.current.ignorePunctuation =
                    event.currentTarget.checked}
              />
              Ignore Punctuation
            </label>
            <label>
              <input
                type="checkbox"
                name="wholeWords"
                checked={true}
                onChange={(event) =>
                  options.current.wholeWords = event.currentTarget.checked}
              />
              Match Whole Words
            </label>
            <label>
              <input
                type="checkbox"
                name="variantSpellings"
                checked={true}
                onChange={(event) =>
                  options.current.variantSpellings =
                    event.currentTarget.checked}
              />
              Match Variant Spellings
            </label>
          </div>
        </div>
        <div className="group buttons">
          <button onClick={search}>Search</button>
        </div>
      </div>
      {searchStatus.value.tag === "loading"
        ? <div className="results">Searching...</div>
        : searchStatus.value.tag === "success"
        ? <Results result={searchStatus.value.result} />
        : searchStatus.value.tag === "failure"
        ? <div className="results">Search failed.</div>
        : null}
    </div>
  );
};

const prepareQuery = (
  query1: SearchQuery,
  query2: SearchQuery,
): Query | null => {
  if (query1.query1 && query1.query2 && query2.query1 && query2.query2) {
    return {
      query1,
      query2,
      operator: "bot",
    };
  }

  if (query1.query1 && query1.query2 && query2.query1) {
    return {
      query1,
      query2: query2.query1,
      operator: "bot",
    };
  }

  if (query1.query1 && query1.query2) {
    return query1;
  }

  if (query1.query1) {
    return query1.query1;
  }

  return null;
};
