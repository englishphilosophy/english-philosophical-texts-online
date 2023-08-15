import type { PageDetails } from "../../islands/Info.tsx";

/** Research page titles. */
export const researchTitles = {
  research: "Introduction",
  similarity: "Semantic Similarity",
  topics: "Topic Frequency",
};

/** Research page details. */
export const researchPages: PageDetails[] = [
  { id: "research", title: researchTitles.research, url: "/research" },
  {
    id: "similarity",
    title: researchTitles.similarity,
    url: "/research/similarity",
  },
  { id: "topics", title: researchTitles.topics, url: "/research/topics" },
];
