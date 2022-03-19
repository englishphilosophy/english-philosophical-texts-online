import library from '../elements/library.ts'
import * as read from '../server/read.ts'

export default async function init () {
  const searchInput = document.querySelector('[data-action="filter-authors"]')
  const orderSelect = document.querySelector('[data-action="order-authors"]')
  const libraryDiv = document.getElementById('library')
  
  if (searchInput && orderSelect && libraryDiv) {
    const authors = await read.authors()

    function update () {
      libraryDiv.innerHTML = library(authors, searchInput.value, orderSelect.value).innerHTML
    }

    searchInput.addEventListener('keyup', update)
    orderSelect.addEventListener('change', update)
    update()
  }
}
