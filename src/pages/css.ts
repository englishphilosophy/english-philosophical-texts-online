import * as fonts from '../style/fonts.ts'

import blocks from '../css/blocks.ts'
import breadcrumb from '../css/breadcrumb.ts'
import controls from '../css/controls.ts'
import header from '../css/header.ts'
import library from '../css/library.ts'
import main from '../css/main.ts'
import misc from '../css/misc.ts'
import nav from '../css/nav.ts'
import reader from '../css/reader.ts'
import summary from '../css/summary.ts'
import toc from '../css/toc.ts'

export default `
${fonts.GFSDidot}
${fonts.IMFell}
${fonts.IMFellItalic}
${fonts.IMFellSC}
${blocks}
${breadcrumb}
${controls}
${header}
${library}
${main}
${misc}
${nav}
${reader}
${summary}
${toc}
`.replace(/\n/g, '').replace(/\s\s+/g, ' ')
