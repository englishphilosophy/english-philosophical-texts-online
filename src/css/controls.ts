import * as colours from '../style/colours.ts'

export default `
.controls {
  display: grid;
  grid-gap: .5em;
  grid-template-columns: 1fr;
  padding: .5em .5em 0;
}

@media (min-width: 34rem) {
  .controls {
    grid-template-columns: 1fr auto;
  }
}

@media (min-width: 58rem) {
  .controls {
    background: rgba(20,20,20,0.5);
    padding: 1em;
  }
}
`
