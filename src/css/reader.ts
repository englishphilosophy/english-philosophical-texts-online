import * as colours from '../style/colours.ts'

export default `
.reader {
  padding: .5em 0;
}

.reader .section-wrapper:first-child,
.reader .section-wrapper:last-child {
  display: none;
}

.reader .section {
  border: 1px solid ${colours.gray};
  background: #fff;
}

.reader .section-menu {
  width: 100%;
  background: ${colours.blue};
  color: ${colours.white};
  border: 0;
}

@media (min-width: 79rem) {
  .reader {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr;
  }

  .reader .section-wrapper:first-child {
    display: block;
  }
}
`
