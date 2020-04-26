import * as colours from '../style/colours.ts'

export default `
.nav {
  position: sticky;
  top: 0;
  background: ${colours.offwhite};
  transition: .3s ease-in-out;
}

.nav.stuck {
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
`
