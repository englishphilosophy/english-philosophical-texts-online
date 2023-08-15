type Props = {
  id: number;
  label: string;
  query: Query;
};

type Query = {
  query1: string;
  query2: string;
  operator: "and" | "or";
}

export default ({ id, label, query }: Props) => (
  <div className="group">
    <label className="label">{label}</label>
    <div className="inputs">
      <input type="text" required={id === 1} onInput={(event) => query.query1 = event.currentTarget.value} />
      <select onChange={(event) => query.operator = event.currentTarget.value as "and" | "or"}>
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>
      <input type="text" onInput={(event) => query.query2 = event.currentTarget.value} />
    </div>
  </div>
);
