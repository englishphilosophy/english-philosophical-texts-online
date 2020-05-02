import * as colours from '../style/colours.ts'

export default `
.links {
  display: flex;
}

.links a {
  flex: 1;
  padding: .5em 1em;
  border: 1px solid ${colours.blue};
  transition: all .2s ease-in-out;
}

.links a:not(:last-child) {
  margin-right: 1em;
}

.links a:hover,
.links a.active {
  background: ${colours.blue};
  color: #fff;
  text-decoration: none;
}
`
