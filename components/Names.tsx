import type { Analysis } from "ept/types";
import Warning from "./Warning.tsx";

type Props = {
  analysis: Analysis;
};

export default ({ analysis }: Props) => (
  <div className="section-content usage">
    <Warning />
    {analysis.names.length > 0 ? (
      <ul>
        {analysis.names.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    ) : (
      <p>No named people.</p>
    )}
  </div>
);
