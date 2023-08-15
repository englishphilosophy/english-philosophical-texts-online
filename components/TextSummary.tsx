import type { Text } from "ept/types";

type Props = {
  text: Text;
};

export default ({ text }: Props) => (
  <div className="section-content about">
    <p dangerouslySetInnerHTML={{ __html: text.sourceDesc }} />
    <h4>First published</h4>
    <p>{text.published.map((x) => x.toString(10)).join(", ")}</p>
    <h4>Copytext</h4>
    <p>{text.copytext.map((x) => x.toString(10)).join(", ")}</p>
    {text.sourceUrl ? (
      <>
        <h4>Source</h4>
        <p>
          <a href={text.sourceUrl}>{text.sourceUrl}</a>
        </p>
      </>
    ) : null}
  </div>
);
