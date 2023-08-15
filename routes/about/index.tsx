import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import { aboutPages, aboutTitles } from "./_titles.ts";

export default () => (
  <Page
    section="About"
    nav={
      <hgroup>
        <h1>About: {aboutTitles.about}</h1>
      </hgroup>
    }
  >
    <Info pageId="about" pages={aboutPages}>
      <div className="content">
        <h1>{aboutTitles.about}</h1>
        <p>
          <i>English Philosophical Texts Online</i> is part of a project at the
          {" "}
          <a href="https://www.ox.ac.uk">University of Oxford</a>. Our aim is to
          provide high-quality digital editions of a broad canon of English
          language philosophical works published in Britain between 1650 and
          1830, to make them freely available in one place, and to provide
          intuitive software for performing sophisticated searches and
          computational analyses of these works. For more information about the
          analytical software we have planned, see the{" "}
          <a href="/research">Research</a> section of this site.
        </p>
        <p>
          Roughly 40% our target works have already been digitised, through
          projects like the{" "}
          <a href="http://www.textcreationpartnership.org/">
            Text Creation Partnership
          </a>
          , the{" "}
          <a href="http://oll.libertyfund.org/">Online Library of Liberty</a>,
          and{" "}
          <a href="https://www.gutenberg.org/">Project Gutenberg</a>. However,
          these works can be difficult to locate unless you already know where
          to look, and the fact that they are spread out over multiple sites
          prohibits systematic searching and comparative computational analysis.
          Furthermore, the editions on these sites do not include universal
          paragraph references, making them of limited use to historians of
          philosophy. By combining these works with new digitisations of as many
          other works, including several by often neglected female writers, we
          hope to provide a lasting scholarly resource of unparalleled size in
          this field.
        </p>
        <p>
          Thanks to the{" "}
          <a href="https://innovation.ox.ac.uk/award-details/john-fell-fund/">
            John Fell Fund
          </a>
          , we conducted a pilot project last year (2018-19), the principal aim
          of which was to draw up a list of works, locate the best publicly
          available digital editions of those works, and to estimate the cost
          and feasibility of converting these editions into a consistent format
          and of digitizing the works that remain. We are now applying to the
          Leverhulme Trust for the necessary funds to see the project through to
          completion. We continue to seek input from scholars, teachers, and
          other interested parties, so please <a href="/contact">contact us</a>
          {" "}
          with any suggestions, queries, or expressions of interest.
        </p>
      </div>
    </Info>
  </Page>
);
