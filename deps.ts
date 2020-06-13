export {
  exists,
  existsSync,
  readFileStrSync,
  readJsonSync,
  writeFileStrSync
} from 'https://deno.land/std@v0.57.0/fs/mod.ts'

export {
  parse as parseYaml
} from 'https://deno.land/std@v0.57.0/encoding/yaml.ts'

export {
  element,
  Element,
  TagName
} from 'https://raw.githubusercontent.com/merivale/elementary/v0.3.0/mod.ts'

export {
  App,
  HttpError,
  Request,
  Response,
  HtmlResponse,
  JavascriptResponse,
  JsonResponse,
  OkResponse,
  Status
} from 'https://raw.githubusercontent.com/merivale/womble/v0.3.0/mod.ts'

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
} from '../english-philosophical-texts/bin/types/analysis.ts'
