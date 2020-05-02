import * as usage from '../elements/usage.ts'
import * as read from './read.ts'

const usageElement = document.getElementById('usage')
const dataDivs = usageElement ? Array.from(usageElement.querySelectorAll('.data')) : []

async function init () {
  if (usageElement) {
    const analysis = await read.analysis(usageElement.dataset.id)
    if (analysis) {
      for (const dataDiv of dataDivs) {
        dataDiv.querySelector('.content').innerHTML = usage[dataDiv.dataset.content](analysis).outerHTML
      }
    }
  }
}

if (usageElement) {
  for (const dataDiv of dataDivs) {
    const toggle = dataDiv.querySelector('h2 > a')
    toggle.addEventListener('click', () => {
      dataDiv.classList.toggle('collapsed')
    })
  }
}

init()
