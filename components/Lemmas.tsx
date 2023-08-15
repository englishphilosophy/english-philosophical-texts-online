import type { Analysis } from "ept/types";
import Warning from "./Warning.tsx";

type Props = {
  analysis: Analysis;
};

export default ({ analysis }: Props) => (
  <div className="section-content usage">
    <Warning />
    <table>
      <thead>
        <tr>
          <th>Lemma</th>
          <th>Raw frequency</th>
          <th>TF-IDF</th>
        </tr>
      </thead>
      <tbody>
        {analysis.lemmas.map((lemma) => (
          <tr>
            <td>{lemma.label}</td>
            <td>{lemma.frequency.toString(10)}</td>
            <td>{lemma.relativeTfIdf.toString(10).slice(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
