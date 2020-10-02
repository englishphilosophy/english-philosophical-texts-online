import { Author, Text, Block } from '../../deps_client.ts'

/** Creates an HTML link element for an author, text, or block. */
export function link (data: Author|Text|Block): string {
  if (data instanceof Author) {
    return `<a href="${url(data)}">${fullname(data)}</a>`
  }
  if (data instanceof Text) {
    return `<a href="${url(data)}">${title(data)}</a>`
  }
  let id = data.author ? data.id.replace(/^[a-zA-Z]+\./, `${data.author}.`) : data.id
  return `<a href="${url(data)}">${id}</a>`
}

/** Create the (local) URL for an author, text, or block. */
export function url (data: Author|Text|Block): string {
  return (data instanceof Block && data.type !== 'title')
    ? `/texts/${data.id.toLowerCase().replace(/\.([^\.]*)$/, '#$1').replace(/\./g, '/')}`
    : `/texts/${data.id.toLowerCase().replace(/\./g, '/')}`
}

/** Creates the full display name of an author, optionally highlighted by a search match. */
export function fullname (author: Author, search?: string): string {
  const fullname = author.title
    ? `${author.title} [${author.forename} ${author.surname}]`
    : `${author.forename} ${author.surname}`

  return (search && search.length > 0)
    ? fullname.replace(regexp(search), '<mark>$1</mark>')
    : fullname
}

/** Creates a regular expression from a search query string. */
export function regexp (search: string): RegExp {
  return new RegExp(`\\b(${search})`, 'i')
}

/** Creates the full display title of a text. */
export function title (text: Text): string {
  return `${text.title} (${text.published.map(x => x.toString(10)).join(', ')})`
}
