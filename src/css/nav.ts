import * as colours from '../style/colours.ts'
import * as images from '../style/images.ts'

export default `
.nav {
  background: #f5e6c7;
  background-image: url('${images.leviathan}');
  background-size: cover;
  background-position: center;
  padding: 10em 1em 1em;
}

.nav-content {
  max-width: 86em;
  min-height: 4.125em;
  margin: 0 auto;
}

.nav-content h2 {
  background: ${colours.transbeige};
  margin: 0;
  font-size: 1.45em;
  font-weight: 700;
  padding: 1rem;
}
`
