import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import { aboutPages, aboutTitles } from "./_titles.ts";

export default () => (
  <Page
    section="About"
    nav={
      <hgroup>
        <h1>About: {aboutTitles.contact}</h1>
      </hgroup>
    }
  >
    <Info pageId="contact" pages={aboutPages}>
      <div className="content">
        <h1>{aboutTitles.contact}</h1>
        <p>
          <i>English Philosophical Texts Online</i> is being developed by{" "}
          <a href="https://merivale.uk">Amyas Merivale</a> and{" "}
          <a href="http://www.millican.org">Peter Millican</a> at the{" "}
          <a href="https://www.ox.ac.uk">University of Oxford</a>. We are
          philosophers and historians of 18th century philosophy, with a keen
          interest in digital humanities and in the value of high-quality
          digital texts. We developed{" "}
          <a href="https://davidhume.org">Hume Texts Online</a>, a site
          providing free digital editions of the complete works of David Hume.
          With this larger project we hope to provide a similar resource
          encompassing the works of many more British philosophers.
        </p>
        <p>
          For suggestions or queries, please contact Amyas Merivale at{" "}
          <a href="mailto:amyas.merivale@philosophy.ox.ac.uk">
            amyas.merivale@philosophy.ox.ac.uk
          </a>
          .
        </p>
      </div>
    </Info>
  </Page>
);
