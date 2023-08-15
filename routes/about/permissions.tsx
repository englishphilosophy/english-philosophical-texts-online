import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import { aboutPages, aboutTitles } from "./_titles.ts";

export default () => (
  <Page
    section="About"
    nav={
      <hgroup>
        <h1>About: {aboutTitles.permissions}</h1>
      </hgroup>
    }
  >
    <Info pageId="permissions" pages={aboutPages}>
      <div className="content">
        <h1>{aboutTitles.permissions}</h1>
        <p>
          The works on this site are all in the public domain. The digital
          critical texts made available here, insofar as they constitute new
          intellectual property (in virtue of the digitization itself, editorial
          interventions, and metatextual markup), are all made available under a
          Creative Commons{" "}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
            Attribution-NonCommercial-ShareAlike 4.0 License
          </a>
          . In plain terms, you are free to use and adapt these materials
          however you like, as long as you are not making a profit, you
          acknowledge this web site as their source, and you make whatever you
          produce available under the same terms.
        </p>
        <p>
          In several cases these texts here derive from digitized texts from
          other sources. We have only started from texts that are either in the
          public domain (such as those from the{" "}
          <i>Text Creation Partnership</i>) or have a suitably generous
          copyright (such as those from the{" "}
          <i>Online Library of Liberty</i>, which are free to use for
          educational and academic purposes). Details of the providence of each
          text are available via the About section for that text.
        </p>
      </div>
    </Info>
  </Page>
);
