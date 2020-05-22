import * as colours from '../style/colours.ts'

export default `
.breadcrumb {
  flex: 1;
  display: flex;
  align-items: center;
  overflow-y: auto;
  padding: 0 .5em;
  background: ${colours.transblack};
  color: ${colours.white};
}

.breadcrumb div {
  white-space: nowrap;
}

.breadcrumb div:not(:last-child)::after {
  padding: 0 .25em;
  content: "/";
}

.breadcrumb a {
  display: inline-block;
  padding: .25em;
  white-space: nowrap;
  color: inherit;
}
`
