import type { Analysis } from "ept/types";
import Warning from "./Warning.tsx";

type Props = {
  analysis: Analysis;
};

export default ({ analysis }: Props) => (
  <div className="section-content usage">
    <Warning />
    {analysis.foreignText.length > 0 ? (
      <ul>
        {analysis.foreignText.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    ) : (
      <p>No foreign text.</p>
    )}
  </div>
);
