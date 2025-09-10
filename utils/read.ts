import type {
  Analysis,
  Author,
  QueryParams,
  SearchResult,
  Text,
} from "ept/types";
import { type Safely, safely } from "./safely.ts";

const baseUrl = "	https://ept-3r708651e8t4.deno.dev";

export type TextDetails = {
  text: Author | Text;
  analysis: Analysis;
};

export const fetchAuthors = () => fetchFromEPT<Author[]>("authors");

export const fetchText = async (id: string): Promise<Safely<TextDetails>> => {
  const textPromise = fetchFromEPT<Text | Author>(`html/${id.toLowerCase()}`);
  const analysisPromise = fetchFromEPT<Analysis>(
    `analysis/${id.toLowerCase()}`,
  );
  const [textResponse, analysisResponse] = await Promise.all([
    textPromise,
    analysisPromise,
  ]);

  if (!textResponse.ok) {
    return textResponse;
  }

  if (!analysisResponse.ok) {
    return analysisResponse;
  }

  return {
    ok: true,
    result: { text: textResponse.result, analysis: analysisResponse.result },
  };
};

export const fetchSearchResults = (
  queryParams: QueryParams,
): Promise<Safely<SearchResult[]>> =>
  fetchFromEPT("search", {
    method: "POST",
    body: JSON.stringify(queryParams),
  });

const fetchFromEPT = async <Result>(
  url: string,
  init?: RequestInit,
): Promise<Safely<Result>> => {
  const response = await safely(
    () => fetch(`${baseUrl}/${url}`, init),
    "Couldn't connect to EPT service.",
  );

  if (!response.ok) {
    return response;
  }

  if (response.result.status === 400) {
    return { ok: false, message: "EPT resource not found." };
  }

  if (!response.result.ok) {
    return {
      ok: false,
      message:
        `Unexpected response from EPT (status ${response.result.status}).`,
    };
  }

  return await safely(
    () => response.result.json(),
    "Unexpected response from EPT (malformed JSON).",
  );
};
