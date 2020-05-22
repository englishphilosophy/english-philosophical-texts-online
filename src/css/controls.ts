import * as colours from '../style/colours.ts'

export default `
.controls {
  margin: 10em auto 0;
  width: 100%;
  max-width: 83em;
  background: ${colours.transblack};
  display: grid;
  grid-gap: .5em;
  grid-template-columns: 1fr;
  padding: 1em;
}

@media (min-width: 34rem) {
  .controls {
    grid-template-columns: 1fr auto;
  }
}
`
