import type { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import Page from "../components/Page.tsx";
import Controls, { type Order } from "../islands/Controls.tsx";
import Library from "../islands/Library.tsx";
import type { Author } from "ept/types";
import { fetchAuthors } from "../utils/read.ts";

export const handler: Handlers<Author[]> = {
  async GET(_, ctx) {
    const response = await fetchAuthors();
    if (!response.ok) {
      throw new Error(response.message);
    }
    return ctx.render(response.result);
  },
};

export default ({ data }: PageProps<Author[]>) => {
  const order = useSignal<Order>("publication");
  const searchTerm = useSignal("");

  return (
    <Page
      section="Texts"
      bodyClass="home"
      nav={<Controls searchTerm={searchTerm} order={order} />}
    >
      <Library authors={data} searchTerm={searchTerm} order={order} />
    </Page>
  );
};
