import { type Data, isAuthor, isText, isTextStub } from "ept/types";
import fullname from "../utils/fullname.ts";
import url from "../utils/url.ts";
import title from "../utils/title.ts";

type Props = {
  data: Data;
};

export default ({ data }: Props) => {
  if (isAuthor(data)) {
    return <a href={url(data)}>{fullname(data)}</a>;
  }
  if (isText(data) || isTextStub(data)) {
    return <a href={url(data)}>{title(data)}</a>;
  }
  const id = data.author
    ? data.id.replace(/^[a-zA-Z]+\./, `${data.author}.`)
    : data.id;
  return <a href={url(data)}>{id}</a>;
};
