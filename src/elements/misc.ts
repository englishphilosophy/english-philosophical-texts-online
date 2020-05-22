import {
  Author,
  Text,
  Block
} from '../../deps_client.ts'

export function link (data: Author|Text|Block): string {
  if (data instanceof Author) {
    return `<a href="${url(data)}">${fullname(data)}</a>`
  }
  if (data instanceof Text) {
    return `<a href="${url(data)}">${title(data)}</a>`
  }
  return `<a href="${url(data)}">${data.id}</a>`
}

export function url (data: Author|Text|Block): string {
  return (data instanceof Block && data.type !== 'title')
    ? `/texts/${data.id.toLowerCase().replace(/\.([^\.]*)$/, '#$1').replace(/\./g, '/')}`
    : `/texts/${data.id.toLowerCase().replace(/\./g, '/')}`
}

export function fullname (author: Author, search?: string): string {
  const fullname = author.title
    ? `${author.title} [${author.forename} ${author.surname}]`
    : `${author.forename} ${author.surname}`
    
  return (search && search.length > 0)
    ? fullname.replace(regexp(search), '<mark>$1</mark>')
    : fullname
}

export function title (text: Text): string {
  return `${text.title} (${text.published.map(x => x.toString(10)).join(', ')})`
}

export function regexp (search: string): RegExp {
  return new RegExp(`\\b(${search})`, 'i')
}
