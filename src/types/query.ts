/** A search query. */
export type Query = string|ComplexQuery

/** A complex search query. */
export type ComplexQuery = {
  query1: Query
  query2: Query
  operator: Operator
}

/** A search operator ('bot' means 'but not': `x BOT y := x AND NOT y). */
export type Operator = 'and'|'or'|'bot'
