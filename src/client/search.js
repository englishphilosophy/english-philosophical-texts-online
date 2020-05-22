import { results } from '../elements/search.ts'

export default function init () {
  const searchForm = document.querySelector('.search-form')
  
  async function search (event) {
    event.preventDefault()

    const evaluableInputs = Array.from(searchForm.querySelectorAll('input[type="text"], input[type="hidden"], select'))
    const checkableInputs = Array.from(searchForm.querySelectorAll('input[type="checkbox"]'))
    const fields = []
    for (const field of evaluableInputs) {
      fields.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`)
    }
    for (const field of checkableInputs) {
      fields.push(`${encodeURIComponent(field.name)}=${field.checked ? 'on' : 'off'}`)
    }
    const query = fields.join('&')
  
    const response = await window.fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: query
    })
  
    if (response.ok) {
      const json = await response.json()
      searchForm.nextElementSibling.innerHTML = results(json[0]).innerHTML
    }
  }
  
  if (searchForm) {
    searchForm.addEventListener('submit', search)
  }
}
