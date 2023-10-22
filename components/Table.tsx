import type { ComponentChild } from "preact";

type Props = {
  titles: ComponentChild[];
  scores?: number[];
};

export default ({ titles, scores }: Props) => {
  if (!scores) {
    return <p>Array index out of range.</p>;
  }

  const data = scores
    .map((score, index) => ({ title: titles[index], score }))
    .sort((x, y) => y.score - x.score);

  return (
    <table>
      <thead>
        <tr>
          <th>Comparison text</th>
          <th>Similarity&nbsp;score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((x) => (
          <tr>
            <td>{x.title}</td>
            <td>{(x.score * 10000).toString(10).slice(0, 6).padEnd(6, "0")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
