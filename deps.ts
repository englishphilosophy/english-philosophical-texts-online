export {
  existsSync,
  readFileStrSync,
  readJsonSync,
  writeFileStrSync
} from 'https://deno.land/std@v0.41.0/fs/mod.ts'

export {
  App,
  Element,
  HttpError,
  Request,
  Response,
  HtmlResponse,
  JavascriptResponse,
  JsonResponse,
  Status,
  TagName
// } from 'https://raw.githubusercontent.com/merivale/elementary/master/mod.ts'
} from '../elementary/mod.ts'

export {
  Author,
  Text,
  Block
// } from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/bin/type/library.ts'
} from '../english-philosophical-texts/bin/types/library.ts'

// export * from 'https://raw.githubusercontent.com/englishphilosophy/english-philosophical-texts/master/bin/types/analysis.ts'
export * from '../english-philosophical-texts/bin/types/analysis.ts'
