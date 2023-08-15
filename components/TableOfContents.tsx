import type { Author, Text } from "ept/types";
import Link from "./Link.tsx";
import title from "../utils/title.ts";

type Props = {
  text: Author | Text;
};

export default ({ text }: Props) => (
  <ul className="section-content toc">
    {text.texts.map((textStub) => (
      <li>{textStub.imported ? <Link data={textStub} /> : title(textStub)}</li>
    ))}
  </ul>
);
