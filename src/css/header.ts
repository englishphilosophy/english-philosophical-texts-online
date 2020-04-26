import * as colours from '../style/colours.ts'
import * as fonts from '../style/fonts.ts'

export default `
.header {
  background: ${colours.blue};
  color: #fff;
}

.header div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-family: ${fonts.old};
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  padding: .75em .5em .5em;
  margin: 0;
}

.header button {
  display: flex;
}

.header svg {
  fill: #fff;
}

.header nav {
  height: 0;
  overflow: hidden;
}

.header nav.open {
  height: initial;
  padding: .5em;
}

.header nav a {
  display: block;
  padding: .25em 1em;
  color: #fff;
}

.header nav a.active,
.header nav a:hover {
  background: #fff;
  text-decoration: none;
  color: ${colours.blue};
}

@media (min-width: 46em) {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .header button {
    display: none;
  }

  .header nav {
    height: initial;
    display: flex;
    padding: 0 .25em;
  }

  .header nav a {
    margin: 0 .25em;
  }
}
`
