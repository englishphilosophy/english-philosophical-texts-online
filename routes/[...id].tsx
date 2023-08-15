import { type Handlers, type PageProps } from "$fresh/server.ts";
import Page from "../components/Page.tsx";
import { type Analysis, type Author, isAuthor, type Text } from "ept/types";
import { type TextDetails, fetchText } from "../utils/read.ts";
import Breadcrumb from "../components/Breadcrumb.tsx";
import AuthorDisplay from "../islands/AuthorDisplay.tsx";
import TextDisplay from "../islands/TextDisplay.tsx";

export const handler: Handlers<TextDetails | null> = {
  async GET(_, ctx) {
    const { id } = ctx.params;
    const response = await fetchText(id);
    if (!response.ok) {
      if (response.message === "EPT resource not found.") { // yuk
        return ctx.renderNotFound();
      }
      throw new Error(response.message);
    }

    return ctx.render(response.result);
  },
};

export default ({ data }: PageProps<TextDetails>) => {
  const { text, analysis } = data;
  return isAuthor(text)
    ? (
      <Page section="Texts" nav={<Breadcrumb ancestors={[text]} />}>
        <AuthorDisplay author={text} analysis={analysis} />
      </Page>
    )
    : (
      <Page
        section="Texts"
        nav={
          <Breadcrumb
            ancestors={text.ancestors}
            prev={text.prev}
            next={text.next}
          />
        }
      >
        <TextDisplay text={text} analysis={analysis} />
      </Page>
    );
};
