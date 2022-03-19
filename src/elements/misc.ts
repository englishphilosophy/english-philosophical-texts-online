import { Author, Data, Text, TextStub, isAuthor, isBlock, isText, isTextStub } from '../../deps_client.ts'

/** Creates an HTML link element for an author, text, or block. */
export const link = (data: Data): string => {
  if (isAuthor(data)) {
    return `<a href="${url(data)}">${fullname(data)}</a>`
  }
  if (isText(data) || isTextStub(data)) {
    return `<a href="${url(data)}">${title(data)}</a>`
  }
  const id = data.author ? data.id.replace(/^[a-zA-Z]+\./, `${data.author}.`) : data.id
  return `<a href="${url(data)}">${id}</a>`
}

/** Create the (local) URL for an author, text, or block. */
export const url = (data: Data): string => {
  return (isBlock(data))
    ? `/texts/${data.id.toLowerCase().replace(/\.([^\.]*)$/, '#$1').replace(/\./g, '/')}`
    : `/texts/${data.id.toLowerCase().replace(/\./g, '/')}`
}

/** Creates the full display name of an author, optionally highlighted by a search match. */
export const fullname = (author: Author, search?: string): string => {
  const fullname = author.title
    ? `${author.title} [${author.forename} ${author.surname}]`
    : `${author.forename} ${author.surname}`

  return (search && search.length > 0)
    ? fullname.replace(regexp(search), '<mark>$1</mark>')
    : fullname
}

/** Creates a regular expression from a search query string. */
export const regexp = (search: string): RegExp => {
  return new RegExp(`\\b(${search})`, 'i')
}

/** Creates the full display title of a text. */
export const title = (text: Text | TextStub): string => {
  return `${text.title} (${text.published.map(x => x.toString(10)).join(', ')})`
}
