import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import Table from "../../components/Table.tsx";
import { researchPages, researchTitles } from "./_titles.ts";
import { religionAuthorScores, religionTextScores } from "./_data.tsx";

export default () => (
  <Page
    section="Research"
    nav={
      <hgroup>
        <h1>About: {researchTitles.topics}</h1>
      </hgroup>
    }
  >
    <Info pageId="topics" pages={researchPages}>
      <div className="content">
        <h1>{researchTitles.topics}</h1>
        <h2>Topics</h2>
        <p>
          It has been suggested that women philosophers of the early modern
          period were more interested in religion than men. How might one assess
          this hypothesis? In the absence of a computer and a large digital
          corpus, there is not much to be done besides reading widely, and
          forming an impression as best one can. With the tools we plan to
          develop here, however, it will be possible to take some more objective
          measurements.
        </p>
        <p>
          For the purposes of computation, we can define a <i>topic</i>{" "}
          to be a set of words and phrases, each with a positive numeric
          weighting. We can then measure the extent to which a given work is
          concerned with this topic by taking the relative frequency of each of
          these words and phrases in the work, multiplying it by its weighting,
          and summing the result. In due course we intend to allow users of this
          site to create arbitrary topics of this kind, and assess how concerned
          with that topic any given work is, according to this measure.
        </p>
        <h2>Modelling religion</h2>
        <p>
          The software we have developed so far does not yet allow for
          multi-word phrases. For illustrative purposes, we have created a
          relatively crude topic to represent relgion, consisiting of thirty
          words of equal weighting: ‘atheism’, ‘atheist’, ‘christ’, ‘christian’,
          ‘christianity’, ‘cosmogony’, ‘deity’, ‘divine’, ‘divinity’, ‘eternal’,
          ‘eternity’, ‘god’, ‘gospel’, ‘messiah’, ‘miracle’, ‘miraculous’,
          ‘prophecy’, ‘prophet’, ‘providence’, ‘religion’, ‘religious’,
          ‘revelation’, ‘scripture’, ‘sin’, ‘soul’, ‘temptation’, ‘theism’,
          ‘theist’, ‘theological’, and ‘theology’. We then calculated how
          ‘religious’ each author and work in our corpus is, as measured against
          this model. The results are shown below. The data so far are
          inconclusive. We hope to be able to deliver some interesting results
          when we have more texts and more refined measurements.
        </p>
        <p>
          Some general comments about the results are in order. First, that
          Norris should presently top the list of religious authors, while not
          itself an implausible result, is explained in large part by the fact
          that the high-scoring <i>Letters Concerning the Love of God</i>{" "}
          is the only work of his we yet have in our corpus. Conway comes second
          for a similar reason; the{" "}
          <i>Principles of the Most Ancient and Modern Philosophy</i>, number 4
          on the list of most religious works, is her only published work. That
          Hume should be second to last is obviously wildly off key, but there
          is a very simple reason for this: although he wrote a lot about
          religion (including the most religious work by this measure), he also
          wrote a lot of other things, including an enormous{" "}
          <i>History of England</i>{" "}
          (which is an order of magnitude larger than any other work we
          currently have in our corpus). The sheer size of his opus thus drags
          his average down.
        </p>
        <p>
          In general, because this measure is based on <em>relative</em>{" "}
          word frequencies, there is a bias in favour of shorter texts and
          authors who wrote less (or for whom we do not yet have so many works
          in our corpus). Taking <em>absolute</em>{" "}
          word frequencies instead would not solve this problem, but simply
          result in the opposite bias. There are better ways to account for
          things like these, which we intend to incorporate into our software
          over the coming years.
        </p>
        <h2>Religious authors</h2>
        <ReligiousAuthorsTable />
        <h2>Religious texts</h2>
        <ReligiousTextsTable />
      </div>
    </Info>
  </Page>
);

  /** Creates a table of authors and religious scores. */
  const ReligiousAuthorsTable = () => (
    <Table
      titles={religionAuthorScores.map((x) => x[0] as string)}
      scores={religionAuthorScores.map((x) => x[1] as number)}
    />
  );
  
  /** Creates a table of texts and religious scores. */
  // TODO: there's some HTML as a string here
  const ReligiousTextsTable = () => (
    <Table
      titles={religionTextScores.map((x) => (
        <>
          {x[0]}, <i>{x[1]}</i>
        </>
      ))}
      scores={religionTextScores.map((x) => x[2] as number)}
    />
  );
  
  
