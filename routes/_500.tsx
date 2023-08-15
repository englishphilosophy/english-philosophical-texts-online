import { ErrorPageProps } from "$fresh/server.ts";
import Page from "../components/Page.tsx";

export default ({ error }: ErrorPageProps) => (
  <Page section="Error">
    <h1>Internal Server Error</h1>
    <p>{error instanceof Error ? error.message : "Something went wrong."}</p>
  </Page>
);
