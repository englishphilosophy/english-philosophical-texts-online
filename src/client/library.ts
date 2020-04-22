import Library from '../data/library.ts'
import * as read from './read.ts'

const searchInput = document.querySelector('[data-action="filter-authors"]')
const orderSelect = document.querySelector('[data-action="order-authors"]')
const libraryDiv = document.getElementById('library')

async function init() {
  const authors = await read.authors()
  const library = new Library(authors)

  function update () {
    if (searchInput) library.search = (searchInput as HTMLInputElement).value
    if (orderSelect) library.order = (orderSelect as HTMLSelectElement).value
    if (libraryDiv) libraryDiv.innerHTML = library.element.innerHTML
  }

  if (searchInput && orderSelect) {
    searchInput.addEventListener('keyup', update)
    orderSelect.addEventListener('change', update)
  }
}

init()
