export {
  existsSync,
  readFileStrSync,
  readJsonSync,
  writeFileStrSync
} from 'https://deno.land/std@v0.52.0/fs/mod.ts'

export {
  parse as parseYaml
} from 'https://deno.land/std@v0.52.0/encoding/yaml.ts'

export {
  App,
  Element,
  HttpError,
  Request,
  Response,
  HtmlResponse,
  JavascriptResponse,
  JsonResponse,
  FileResponse,
  Status,
  TagName
// } from 'https://raw.githubusercontent.com/merivale/elementary/master/mod.ts'
} from '../elementary/mod.ts'

import Author from '../english-philosophical-texts/bin/types/author.ts'
import Block from '../english-philosophical-texts/bin/types/block.ts'
import Text from '../english-philosophical-texts/bin/types/text.ts'
export {
  Author,
  Block,
  Text
}

export {
  Analysis,
  Lemma
// } from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/master/bin/types/analysis.ts'
} from '../english-philosophical-texts/bin/types/analysis.ts'
