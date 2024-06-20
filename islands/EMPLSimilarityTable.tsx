import { useSignal } from "@preact/signals";
import Table from "../components/Table.tsx";
import { emplScores, emplTitles } from "../routes/research/_data.tsx";

const EMPLSimilarityTable = () => {
  const index = useSignal(0);

  return (
    <>
      <select
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(event) => {
          index.value = parseInt(event.currentTarget.value);
        }}
      >
        {emplTitles.map((x, index) => (
          <option value={index.toString(10)}>{x}</option>
        ))}
      </select>
      <Table titles={emplTitles} scores={emplScores[index.value]} />
    </>
  );
};

export default EMPLSimilarityTable;
