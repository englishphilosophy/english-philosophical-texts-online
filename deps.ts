export {
  exists,
  existsSync
} from 'https://deno.land/std@v0.129.0/fs/mod.ts'

export {
  parse as parseYaml
} from 'https://deno.land/std@v0.129.0/encoding/yaml.ts'

export {
  Server
} from 'https://deno.land/std@v0.129.0/http/server.ts'

export {
  element,
  Element
} from 'https://raw.githubusercontent.com/merivale/elementary/v0.4.0/mod.ts'

export type {
  TagName
} from 'https://raw.githubusercontent.com/merivale/elementary/v0.4.0/mod.ts'

export {
  ContentType,
  HttpError,
  Status,
  headers
} from 'https://raw.githubusercontent.com/merivale/womble/v0.7.0/mod.ts'

import Author from '../english-philosophical-texts/bin/types/author.ts'
import Block from '../english-philosophical-texts/bin/types/block.ts'
import Text from '../english-philosophical-texts/bin/types/text.ts'
export {
  Author,
  Block,
  Text
}

export type {
  Analysis,
  Lemma
} from '../english-philosophical-texts/bin/types/analysis.ts'
