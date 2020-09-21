import type { Block } from '../../deps_client.ts'

/** A search result. */
export type Result = {
  id: string
  title: string
  blocks: Block[]
  results: Result[]
  total: number
}
