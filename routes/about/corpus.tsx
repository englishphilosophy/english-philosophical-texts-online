import { type Handlers, type PageProps } from "$fresh/server.ts";
import { type Author, type TextStub } from "ept/types";
import * as read from "../../utils/read.ts";
import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import Link from "../../components/Link.tsx";
import { aboutPages, aboutTitles } from "./_titles.ts";

export const handler: Handlers<Author[]> = {
  async GET(_, ctx) {
    const authors = await read.authors();
    return ctx.render(authors);
  },
};

export default ({ data }: PageProps<Author[]>) => (
  <Page
    section="About"
    nav={
      <hgroup>
        <h1>About: {aboutTitles.corpus}</h1>
      </hgroup>
    }
  >
    <Info pageId="corpus" pages={aboutPages}>
      <Corpus authors={data} />
    </Info>
  </Page>
);

const Corpus = ({ authors }: { authors: Author[] }) => {
  const maleAuthors = authors.filter((a) => a.sex === "Male");
  const femaleAuthors = authors.filter((a) => a.sex === "Female");
  const authorsWithTexts = authors.filter((a) =>
    a.texts.some((t) => t.imported)
  );

  const texts = authors.reduce(
    (accumulator: TextStub[], current) => accumulator.concat(current.texts),
    [],
  );
  const importedTexts = texts.filter((x) => x.imported);
  const duplicatedTexts = texts.filter((x) => x.duplicate);

  const authorsWithTextsList = authorsWithTexts.reduce(
    (accumulator, current, index) => {
      if (index === 0) return <Link data={current} />;
      if (index === authorsWithTexts.length - 1) {
        return (
          <>
            {accumulator}, and <Link data={current} />
          </>
        );
      }
      return (
        <>
          {accumulator}, <Link data={current} />
        </>
      );
    },
    <></>,
  );

  return (
    <div className="content">
      <h1>{aboutTitles.corpus}</h1>
      <p>
        The corpus on this site contains{" "}
        {texts.length - duplicatedTexts.length / 2}{" "}
        English-language philosophical texts published in Britain between 1650
        and 1830, by {authors.length} authors ({maleAuthors.length} male and
        {" "}
        {femaleAuthors.length}{" "}
        female). Our aim is to provide free and high-quality digital critical
        texts for all of the works in our corpus, alongside tools for performing
        sophisticated searches and comparative textual analyses. Note however
        that this project is still in the early stages. So far we have prepared
        {" "}
        {importedTexts.length} texts by {authorsWithTextsList}.
      </p>
      <p>Our selection is based on the following general considerations:</p>
      <ol>
        <li>
          Works should be originally published in English. This restriction is
          necessary because of the kinds of computational linguistic analyses we
          want to run, which only make sense applied to a single language.
          Hobbes and Conway necessitate bending this rule slightly. We have
          included the English versions of Hobbes’s works that he himself
          published (even if he published a Latin version first), but excluded
          his Latin works that were only translated posthumously. The original
          English manuscript of Conway’s{" "}
          <em>Principles of Ancient and Modern Philosophy</em>, meanwhile, does
          not survive. It was first published in a Latin translation, then
          posthumously translated from the Latin back into English; we have
          included this third-hand English text, for want of anything better.
        </li>
        <li>
          Works should be philosophical in a suitably broad sense, given the
          period, and consequently the list includes many works on what we would
          now consider more as theology or social science. We have even included
          two histories of England (Hume’s and Macaulay’s), but only because of
          the independent philosophical interest in these writers; we are not
          including histories more generally.
        </li>
        <li>
          Works should be written by a known British author (the highly
          influential Dutch-born immigrant Mandeville being a partial exception
          to this rule). This is simply to keep things within reasonable bounds.
          Works by unknown authors or North American writers could be added in
          the future. (This is why—with apologies to the Irish, Scottish, and
          Welsh—we have called this site <em>English</em>{" "}
          Philosophical Texts Online, and not <em>British</em>{" "}
          Philosophical Texts Online. As with the similarly titled{" "}
          <em>Early English Books Online</em>, it is to the language and not the
          nation that we are referring.)
        </li>
        <li>
          The collection should include adequate female representation, with a
          minimum target of 20%. Happily we are exceeding that target
          comfortably at present.
        </li>
      </ol>
      <p>
        We welcome suggestions for additional works of interest that we may have
        missed. Particularly welcome are works by neglected or forgotten female
        philosophers.
      </p>
    </div>
  );
};
