import {
  Author,
  Text
} from '../../deps_client.ts'

export function textLink (text: Text): string {
  return `<a href="${url(text)}">${textTitle(text)}</a>`
}

export function authorLink (author: Author): string {
  return `<a href="${url(author)}">${fullname(author)}</a>`
}

export function url (data: Author|Text): string {
  return `/texts/${data.id.toLowerCase().replace(/\./g, '/')}`
}

export function textTitle (text: Text): string {
  return `${text.title} (${text.published})`
}

export function fullname (author: Author, search?: string): string {
  const fullname = author.title
    ? `${author.title} [${author.forename} ${author.surname}]`
    : `${author.forename} ${author.surname}`
    
  return (search && search.length > 0)
    ? fullname.replace(regexp(search), '<mark>$1</mark>')
    : fullname
}

export function regexp (search: string): RegExp {
  return new RegExp(`\\b(${search})`, 'i')
}
