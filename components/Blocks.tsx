import type { Block } from "ept/types";
import Link from "./Link.tsx";

type Props = {
  blocks: Block[];
};

export default ({ blocks }: Props) => (
  <div className="section-content blocks">
    {blocks.map((block) => (
      <div className="block" id={block.id.split(".").pop()}>
        <div className="id">
          <Link data={block} />
        </div>
        <div className="content">
          {block.speaker ? (
            <>
              <i>{block.speaker}</i>.{" "}
            </>
          ) : null}
          <span dangerouslySetInnerHTML={{ __html: block.content }}></span>
        </div>
      </div>
    ))}
  </div>
);
