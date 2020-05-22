import * as colours from '../style/colours.ts'

export default `
.context {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${colours.transblack};
  color: ${colours.white};
}

.context a {
  display: block;
  padding: .25em .5em;
  color: inherit;
}
`
