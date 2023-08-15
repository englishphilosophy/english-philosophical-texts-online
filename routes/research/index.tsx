import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import { researchPages, researchTitles } from "./_titles.ts";

export default () => (
  <Page
    section="Research"
    nav={
      <hgroup>
        <h1>About: {researchTitles.research}</h1>
      </hgroup>
    }
  >
    <Info pageId="research" pages={researchPages}>
      <div className="content">
        <h1>{researchTitles.research}</h1>
        <p>
          In addition to providing high-quality critical texts for each of the
          works listed on this site, we also plan to develop software for
          searching and analysing these texts in a variety of useful ways, and
          to pursue research illustrating the scholarly application and value of
          these tools. So far, it is possible to run complex Boolean searches in
          the Search area for each text, and to view (provisional) word usage
          analysis in the several Analysis areas. (When reading a text, select
          the area of interest from the blue dropdown menu.) Our project is
          still in the early stages, with many more features planned if we
          secure funding to take things further. In the meantime, details are
          available here of some preliminary tests we have run so far. Click on
          the links in the menu for more information.
        </p>
      </div>
    </Info>
  </Page>
);
