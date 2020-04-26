export default `
.controls {
  display: grid;
  grid-gap: .5em;
  padding: .5em;
  grid-template-columns: 1fr;
}

@media (min-width: 34em) {
  .controls {
    grid-template-columns: 1fr auto;
  }
}
`
