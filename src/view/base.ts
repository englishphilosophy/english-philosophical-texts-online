import * as colours from './colours.ts'
import * as fonts from './fonts.ts'

export default `
${fonts.GFSDidot}
${fonts.IMFell}
${fonts.IMFellItalic}
${fonts.IMFellSC}

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

header {
  padding: 1em 1em .5em;
  font-family: ${fonts.old};
  font-size: 2em;
  font-weight: 600;
  text-align: center;
}

nav section {
  display: flex;
  justify-content: space-around;
}

nav {
  margin: -0.5em 0;
}

nav a {
  padding: .25em 2em;
  border-bottom: .125em solid transparent;
}

nav a.active, nav a:hover {
  border-color: ${colours.blue};
  text-decoration: none;
}

main {}

footer {
  background: ${colours.gray};
  color: ${colours.darkgray};
}

section {
  padding: 1em;
  max-width: 56em;
  margin: 0 auto;
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

a {
  color: ${colours.blue};
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

b {
  font-weight: 600;
}
`.replace(/\n/g, '').replace(/\s\s+/g, ' ')
