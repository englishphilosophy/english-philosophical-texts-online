import { useSignal } from "@preact/signals";
import Table from "../components/Table.tsx";
import {
  dissertationScores,
  dissertationTitles,
  emplTitles,
} from "../routes/research/_data.tsx";

export default () => {
  const index = useSignal(0);

  return (
    <>
      <select
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(event) => {
          index.value = parseInt(event.currentTarget.value);
        }}
      >
        {dissertationTitles.map((x, index) => (
          <option value={index.toString(10)}>{x}</option>
        ))}
      </select>
      <Table
        titles={emplTitles}
        scores={dissertationScores.map((x) => x[index.value])}
      />
    </>
  );
};
