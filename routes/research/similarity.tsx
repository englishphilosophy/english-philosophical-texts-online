import Page from "../../components/Page.tsx";
import Info from "../../islands/Info.tsx";
import Table from "../../components/Table.tsx";
import { researchPages, researchTitles } from "./_titles.ts";
import { dissertationTitles, dissertationScores, emplTitles, emplScores } from "./_data.tsx";

export default () => (
  <Page
    section="Research"
    nav={
      <hgroup>
        <h1>About: {researchTitles.similarity}</h1>
      </hgroup>
    }
  >
    <Info pageId="similarity" pages={researchPages}>
      <div className="content">
        <h1>{researchTitles.similarity}</h1>
        <h2>Lemmatization and TF-IDF</h2>
        <p>
          We are in the process of generating a dictionary of all the words in
          our corpus, and a function that maps all the different forms and
          spellings to a smaller number of lemmas (e.g. mapping ‘pluck’,
          ‘plucks’, ‘plucking’, ‘pluck’d’, ‘plucked’, and ‘pluck’t’ to the
          single lemma ‘pluck’). From here, we are able to calculate the{" "}
          <i>term frequency-inverse document frequency</i>{" "}
          of every lemma in every text. This standard measure from information
          theory multiplies the frequency of a term with the logarithmically
          scaled inverse of the number of documents in the corpus that contain
          the term. Plainly put, infrequent words have a low TF-IDF value, as do
          very frequent but very common words (‘a’, ‘in’, ‘the’, ‘to’, etc.);
          while the words that are both frequent in the document are rare in the
          corpus as a whole score highly. This provides a good estimate of the
          most important words in a text.
        </p>
        <h2>The distance between two texts</h2>
        <p>
          Various measures have been developed to estimate the semantic distance
          between two texts in a corpus, and in due course we hope to provide
          software here for calculating a number of them. A relatively simple
          measure is calcuated as follows: take the frequency of each term in
          the first text, multiply it by the TF-IDF value of that term in the
          second text, and then sum the results. Plainly put, the resulting
          number will be higher, the more the first text contains instances of
          the important terms in the second text.
        </p>
        <p>
          The most obvious use of measures like these would be to identify, when
          reading or studying one text, other related texts in our corpus that
          might be of interest. They could also be used, however, to supplement
          traditional arguments about the influence of one author on another, or
          the importance of one part of a single author’s opus in the
          interpretation of another.
        </p>
        <h2>
          Hume’s <i>Essays, Moral, Political, and Literary, Part 1</i>
        </h2>
        <p>
          The following tables show, for each of the essays in Humes{" "}
          <i>Essays, Moral, Political, and Literary, Part 1</i>, how close the
          other essays in the set are to that essay according to the measure
          just described. The closest matching pair is <i>The Platonist</i> and
          {" "}
          <i>The Stoic</i>. The other high matches (scores of 5 and above) are
          between the other pairs of the four essays on happiness, and for pairs
          of political essays from the first half of the collection. Numbers
          have been multiplied by 10,000 for readability.
        </p>
        <select
          data-table="empl-similarity"
          style={{ width: "100%", marginBottom: "1em" }}
        >
          {emplTitles.map((x, index) => (
            <option value={index.toString(10)}>{x}</option>
          ))}
        </select>
        <EMPLTable id={0} />
        <h2>
          Hume’s <i>Essays</i> and the <i>Four Dissertations</i>
        </h2>
        <p>
          The results of the previous test seem to confirm that the measure is
          working as intended, since related essays are indeed scoring higher
          against each other than comparatively unrelated essays. If we now run
          the same calculation with the <i>Essays</i> measured against Hume’s
          {" "}
          <i>Dissertation on the Passions</i>, both as a whole and against its
          individual sections, the results are potentially interesting. Most
          striking is the very high similarity between <i>Of Tragedy</i>{" "}
          and section 6 of the{" "}
          <i>Dissertation on the Passions</i>. These two parts of Hume’s opus
          were originally side by side in his <i>Four Dissertations</i>{" "}
          of 1757, but he separated them soon after (for the 1758 edition of his
          {" "}
          <i>Essays and Treatises</i>). The results here suggest that separation
          may have been unfortunate.
        </p>
        <select
          data-table="dissertation-similarity"
          style={{ width: "100%", marginBottom: "1em" }}
        >
          {dissertationTitles.map((x, index) => (
            <option value={index.toString(10)}>{x}</option>
          ))}
        </select>
        <DissertationTable id={0} />
      </div>
    </Info>
  </Page>
);

/** Creates a table of Hume.EMPL.1 similarity scores. */
const EMPLTable = ({ id }: { id: number }) => (
  <Table titles={emplTitles} scores={emplScores[id]} />
);

/** Creates a table of Hume.DP vs Hume.EMPL.1 similarity scores. */
const DissertationTable = ({ id }: { id: number }) => (
  <Table
    titles={emplTitles}
    scores={dissertationScores.map((x) => x[id])}
  />
);
