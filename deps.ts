export {
  existsSync,
  readFileStrSync,
  readJsonSync,
  writeFileStrSync
} from 'https://deno.land/std@v0.42.0/fs/mod.ts'

export {
  parse as parseYaml
} from 'https://deno.land/std@v0.42.0/encoding/yaml.ts'

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
} from 'https://raw.githubusercontent.com/merivale/elementary/v0.1.0/mod.ts'

import Author from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/master/bin/types/author.ts'
import Block from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/master/bin/types/block.ts'
import Text from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/master/bin/types/text.ts'
export {
  Author,
  Block,
  Text
}

export {
  Analysis,
  Lemma
} from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/master/bin/types/analysis.ts'
