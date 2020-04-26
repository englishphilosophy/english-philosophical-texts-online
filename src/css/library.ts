import * as colours from '../style/colours.ts'

export default `
.library {
  border-top: 1px solid ${colours.gray};
}

.library section {
  padding: .5em;
  border-bottom: 1px solid ${colours.gray};
}

.library section h6 {
  margin-bottom: .5em;
}

@media (min-width: 34em) {
  .library section {
    display: flex;
  }

  .library section h6 {
    flex: 1;
    padding-right: .5em;
  }

  .library section > div {
    flex-basis: 13em;
  }
}

@media (min-width: 64em) {
  .library {
    border-top: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5em;
  }

  .library section {
    border: 1px solid ${colours.gray};
    background: #fff;
  }
}

@media (min-width: 80em) {
  .library {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
`
