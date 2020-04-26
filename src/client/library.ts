import library from '../elements/library.ts'
import * as read from './read.ts'

const searchInput: HTMLInputElement|null = document.querySelector('[data-action="filter-authors"]')
const orderSelect: HTMLSelectElement|null = document.querySelector('[data-action="order-authors"]')
const libraryDiv: HTMLElement|null = document.getElementById('library')

async function init() {
  const authors = await read.authors()

  function update () {
    if (searchInput && orderSelect && libraryDiv) {
      libraryDiv.innerHTML = library(authors, searchInput.value, orderSelect.value).innerHTML
    }
  }

  if (searchInput && orderSelect) {
    searchInput.addEventListener('keyup', update)
    orderSelect.addEventListener('change', update)
    update()
  }
}

init()
