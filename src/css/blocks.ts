import * as colours from '../style/colours.ts'
import * as fonts from '../style/fonts.ts'

export default `
.blocks h1,
.blocks h2,
.blocks h3,
.blocks h4,
.blocks h5,
.blocks h6 {
  text-align: center;
}


.blocks del {
  display: none;
}

.blocks ins {
  text-decoration: none;
}

.block {
  margin-bottom: 1em;
}

.block .id {
  color: ${colours.blue};
  text-align: right;
  margin-bottom: .5em;
}

.block .content {
  font-family: ${fonts.old};
  font-size: 1.375em;
  text-align: justify;
}

/*
@media (min-width: 40em) {
  .block {
    display: flex;
  }
  
  .block .id {
    flex-basis: 16em;
  }
  
  .block .content {
    flex: 1;
  }
}*/
`
