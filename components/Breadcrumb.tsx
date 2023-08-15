import type { Author, Text, TextStub } from "ept/types";
import url from "../utils/url.ts";

type Props = {
  ancestors: [Author, ...TextStub[]];
  prev?: TextStub;
  next?: TextStub;
};

export default ({ ancestors, prev, next }: Props) => (
  <nav className="breadcrumb">
    <div className="trail">
      {ancestors.map((data) => (
        <div className="crumb">
          <a href={url(data)}>{(data as Text).breadcrumb || data.id}</a>
        </div>
      ))}
    </div>
    <div className="context">
      <div className="prev">
        {prev ? <a href={url(prev)}>&lt; {prev.breadcrumb}</a> : null}
      </div>
      <div className="next">
        {next ? <a href={url(next)}>{next.breadcrumb} &gt;</a> : null}
      </div>
    </div>
  </nav>
);
