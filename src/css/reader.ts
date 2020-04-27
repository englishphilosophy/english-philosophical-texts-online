export default `
.reader {
  display: grid;
  grid-gap: 1em;
  padding: .5em;
}

.reader .title,
.reader .content {
  max-width: 40em;
  margin: 0 auto;
}

@media (min-width: 60em) {
  .reader {
    grid-template-columns: 1fr 1fr;
  }

  .reader .title {
    position: sticky;
    top: 3em;
  }
}
`
