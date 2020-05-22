import * as colours from '../style/colours.ts'
import * as fonts from '../style/fonts.ts'

export default `
.header {
  background: ${colours.blue};
  color: #fff;
  padding: 1em;
}

.header .title {
  font-family: ${fonts.old};
  text-align: center;
}

.header .title h1 {
  font-size: 2em;
  font-weight: 500;
  line-height: 1;
  margin-bottom: .5rem;
}

.header .title h2 {
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1;
  margin: 0;
}

.header .links {
  display: flex;
  justify-content: center;
}

.header .links a {
  padding: .25em .5em;
  margin: 0 .5em;
  color: ${colours.white};
  border-bottom: 3px solid transparent;
  transition: .3s;
}

.header .links a.active,
.header .links a:hover {
  text-decoration: none;
  border-bottom-color: ${colours.beige};
}

@media (min-width: 56rem) {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .header .title {
    text-align: left;
  }
}
`
