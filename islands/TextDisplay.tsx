import { useSignal } from "@preact/signals";
import type { Analysis, Text } from "ept/types";
import Section from "../components/Section.tsx";
import Blocks from "../components/Blocks.tsx";
import TableOfContents from "../components/TableOfContents.tsx";
import Search from "./Search.tsx";
import TextSummary from "../components/TextSummary.tsx";
import Summary from "../components/Summary.tsx";
import Names from "../components/Names.tsx";
import Citations from "../components/Citations.tsx";
import ForeignText from "../components/ForeignText.tsx";
import Lemmas from "../components/Lemmas.tsx";

type Props = {
  text: Text;
  analysis: Analysis;
};

export default ({ text, analysis }: Props) => {
  const area = useSignal("content");

  return (
    <div className="reader">
      <Section>
        <Blocks blocks={text.blocks.slice(0, 1)} />
      </Section>
      <Section>
        <select
          className="section-menu"
          aria-label="Area"
          onChange={(event) => area.value = event.currentTarget.value}
        >
          <optgroup label="Text">
            <option value="content">
              {text.texts.length > 0 ? "Table of Contents" : "Text"}
            </option>
            <option value="search">Search</option>
          </optgroup>
          <optgroup label="Analysis">
            <option value="summary">Word usage summary</option>
            <option value="names">Names</option>
            <option value="citations">Citations</option>
            <option value="foreign">Foreign text</option>
            <option value="lemmas">Lemmas</option>
          </optgroup>
          <optgroup label="About">
            <option value="about">About</option>
          </optgroup>
        </select>
        <div className={area.value === "content" ? "" : "hidden"}>
          {text.texts.length
            ? <TableOfContents text={text} />
            : <Blocks blocks={text.blocks.slice(1)} />}
        </div>
        <div className={area.value === "search" ? "" : "hidden"}>
          <Search id={text.id} />
        </div>
        <div className={area.value === "summary" ? "" : "hidden"}>
          <Summary analysis={analysis} />
        </div>
        <div className={area.value === "names" ? "" : "hidden"}>
          <Names analysis={analysis} />
        </div>
        <div className={area.value === "citations" ? "" : "hidden"}>
          <Citations analysis={analysis} />
        </div>
        <div className={area.value === "foreign" ? "" : "hidden"}>
          <ForeignText analysis={analysis} />
        </div>
        <div className={area.value === "lemmas" ? "" : "hidden"}>
          <Lemmas analysis={analysis} />
        </div>
        <div className={area.value === "about" ? "" : "hidden"}>
          <TextSummary text={text} />
        </div>
      </Section>
    </div>
  );
};
