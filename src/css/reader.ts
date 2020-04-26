export default `
.reader {
  display: grid;
  grid-gap: 1em;
  padding: .5em;
}

@media (min-width: 60em) {
  .reader {
    grid-template-columns: 1fr 1fr;
  }

  .blocks:first-child .block {
    position: sticky;
    top: 3em;
  }
}
`
