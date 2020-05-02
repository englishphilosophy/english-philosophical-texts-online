import * as colours from '../style/colours.ts'
import * as fonts from '../style/fonts.ts'

export default `
* {
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}

body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: ${fonts.sans};
  line-height: 1.5;
  background: ${colours.offwhite};
  color: ${colours.black};
}

h1, h2, h3, h4, h5, h6 {
  margin: 0 0 1rem;
  font-weight: 600;
}

h1 {
  font-size: 1.625em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.375em;
}

h4 {
  font-size: 1.25em;
}

h5 {
  font-size: 1.125em;
}

h6 {
  font-size: 1em;
}

p {
  margin: 0 0 1em;
}

input[type="text"], select {
  background: #fff;
  padding: .25em .5em;
  font: inherit;
}

button {
  font: inherit;
  border: 0;
  outline: 0;
  padding: .5em 1em;
  background: ${colours.blue};
  color: #fff;
  cursor: pointer;
}

a {
  color: ${colours.blue};
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

b {
  font-weight: 600;
}

table {
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
}

thead tr {
  background: ${colours.lightgray};
}

tbody tr {
  border-top: 1px solid ${colours.darkgray};
}

th {
  text-align: left;
  font-weight: 600;
}

th, td {
  padding: .25em .5em;
}
`
