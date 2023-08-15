import type { Author } from "ept/types";
import fullname from "../utils/fullname.ts";

type Props = {
  author: Author;
};

export default ({ author }: Props) => (
  <div className="section-content about">
    <h2>
      {fullname(author)} ({author.birth}-{author.death})
    </h2>
    <h4>
      {author.nationality}, {author.sex}
    </h4>
  </div>
);
