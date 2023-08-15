import { useSignal } from "@preact/signals";
import type { Analysis, Author } from "ept/types";
import Section from "../components/Section.tsx";
import TableOfContents from "../components/TableOfContents.tsx";
import Search from "./Search.tsx";
import AuthorSummary from "../components/AuthorSummary.tsx";
import Summary from "../components/Summary.tsx";
import Names from "../components/Names.tsx";
import Citations from "../components/Citations.tsx";
import ForeignText from "../components/ForeignText.tsx";
import Lemmas from "../components/Lemmas.tsx";

type Props = {
  author: Author;
  analysis: Analysis;
};

export default ({ author, analysis }: Props) => {
  const area = useSignal("works");

  return (
    <div className="reader">
      <Section>
        <AuthorSummary author={author} />
      </Section>
      <Section>
        <select
          className="section-menu"
          aria-label="Area"
          onChange={(event) => area.value = event.currentTarget.value}
        >
          <optgroup label="Author">
            <option value="works">Works</option>
            <option value="search">Search</option>
          </optgroup>
          <optgroup label="Analysis">
            <option value="summary">Word usage summary</option>
            <option value="names">Names</option>
            <option value="citations">Citations</option>
            <option value="foreign">Foreign text</option>
            <option value="lemmas">Lemmas</option>
          </optgroup>
        </select>
        <div className={area.value === "works" ? "" : "hidden"}>
          <TableOfContents text={author} />
        </div>
        <div className={area.value === "search" ? "" : "hidden"}>
          <Search id={author.id} />
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
      </Section>
    </div>
  );
};
