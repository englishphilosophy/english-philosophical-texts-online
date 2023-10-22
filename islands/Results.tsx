import type { SearchResult } from "ept/types";
import Blocks from "../components/Blocks.tsx";

type Props = {
  result?: SearchResult;
};

export default ({ result }: Props) => (
  <div className="results">
    {result ? <ResultDisplay result={result} /> : (
      "No paragraphs matched your search criteria."
    )}
  </div>
);

const ResultDisplay = ({ result }: Required<Props>) => (
  <div className="result">
    <h4 className="title">{result.title}</h4>
    <p className="total">
      {result.total} matching paragraphs
    </p>
    {result.blocks.length > 0
      ? (
        <div className="results">
          <Blocks blocks={result.blocks} />
        </div>
      )
      : null}
    {result.results.length > 0
      ? (
        <div className="results">
          {result.results.map((result) => <ResultDisplay result={result} />)}
        </div>
      )
      : null}
  </div>
);
