import * as colours from '../style/colours.ts'
import * as fonts from '../style/fonts.ts'
import * as images from '../style/images.ts'

export default `
html {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  min-height: 100vh;
}

body {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: ${fonts.sans};
  line-height: 1.5;
  background: ${colours.white};
  color: ${colours.black};
}

header {
  background: ${colours.blue};
}

header hgroup {
  font-family: ${fonts.old};
  color: ${colours.white};
  padding: .5em;
  line-height: 1;
  text-align: center;
}

header h1, header h2 {
  font-weight: normal;
  margin: 0;
}

header h1 {
  margin-bottom: .5rem;
}

header h2 {
  font-style: italic;
}

header nav {
  display: flex;
  justify-content: center;
  margin-bottom: .5em;
}

header nav a {
  color: ${colours.white};
  padding: .25em .5em;
  margin: 0 .5em;
  border-bottom: 3px solid transparent;
  transition: .3s;
}

header nav a:hover, header nav a.active {
  border-color: ${colours.beige};
  text-decoration: none;
}

body > nav {}

body > nav h1 {
  margin: 1rem 1rem 0;
}

main {}

footer {
  background: ${colours.black};
  color: ${colours.white};
  padding: 8em 0 2em;
}

footer section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

footer p {
  flex-basis: 40em;
}

footer ul {
  margin: 0;
  list-style-type: none;
}

section {
  width: 100%;
  max-width: 83em;
  margin: 0 auto;
}

main section, footer section {
  padding: .5em;
}

@media (min-width: 58rem) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  header hgroup {
    padding: 1em;
    text-align: left;
  }

  header nav {
    padding: 1em;
    margin-bottom: 0
  }

  body > nav {
    height: 18em;
    background-image: url('${images.leviathan}');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1em;
  }

  body > nav h1 {
    margin: 0;
    padding: 1rem;
    background: ${colours.blue};
    color: ${colours.white};
  }

  main section, footer section {
    padding: 1em;
  }
}
`
