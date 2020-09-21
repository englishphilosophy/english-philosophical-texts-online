import type { Element } from '../../deps.ts'

/** Page options (used to create entire HTML pages). */
export type PageOptions = {
  title?: string
  section: 'Texts'|'Research'|'About'|'Error'
  bodyClass?: string
  nav?: Element[]
  main: Element[]
}
