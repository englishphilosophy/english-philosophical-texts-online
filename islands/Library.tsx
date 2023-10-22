import type { Signal } from "@preact/signals";
import type { Author } from "ept/types";
import type { Order } from "./Controls.tsx";
import fullname from "../utils/fullname.ts";
import url from "../utils/url.ts";

type Props = {
  authors: Author[];
  searchTerm: Signal<string>;
  order: Signal<Order>;
};

export default ({ authors, searchTerm, order }: Props) => {
  const filteredAuthors = searchTerm.value.length > 0
    ? authors.filter((author) =>
      fullname(author).toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    : authors;

  const sortedAuthors = filteredAuthors.toSorted((a, b) =>
    a.id.localeCompare(b.id)
  );
  switch (order.value) {
    case "publication":
      sortedAuthors.sort((a, b) => a.published - b.published);
      break;
    case "birth":
      sortedAuthors.sort((a, b) => a.birth - b.birth);
      break;
  }

  return (
    <>
      <div className="library">
        {sortedAuthors.length > 0
          ? sortedAuthors.map((author) => (
            <a
              key={author.id}
              className="author"
              href={url(author)}
            >
              <h6
                dangerouslySetInnerHTML={{
                  __html: `${
                    fullname(author, searchTerm.value)
                  } (${author.birth}-${author.death})`,
                }}
              />
              <div className="details">
                <div>Nationality: {author.nationality}</div>
                <div>Sex: {author.sex}</div>
                <div>
                  Texts in library:{" "}
                  {author.texts.filter((x) => x.imported).length} /{" "}
                  {author.texts.length}
                </div>
              </div>
            </a>
          ))
          : <a className="author empty">No matching authors</a>}
      </div>
    </>
  );
};
