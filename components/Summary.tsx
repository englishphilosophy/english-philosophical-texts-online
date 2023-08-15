import type { Analysis } from "ept/types";
import Warning from "./Warning.tsx";

type Props = {
  analysis: Analysis;
};

export default ({ analysis }: Props) => {
  const isAuthor = analysis.id.split(".").length === 1;
  const titleText = isAuthor
    ? "The collected works of this author contain:"
    : "This text contains:";
  return (
    <div className="section-content usage">
      <Warning />
      <p>{titleText}</p>
      <ul>
        <li>
          {analysis.wordCount} words and {analysis.lemmaWordCount} lexemes
        </li>
        <li>
          {analysis.names.length} references to named people (totalling
          {analysis.nameWordCount} words)
        </li>
        <li>
          {analysis.citations.length} citations (totalling
          {analysis.citationWordCount} words)
        </li>
        <li>
          {analysis.foreignText.length} instances of foreign text (totalling
          {analysis.foreignWordCount} words)
        </li>
      </ul>
    </div>
  );
};
