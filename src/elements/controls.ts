import {
  Element
} from '../../deps_client.ts'

export default function controls (): Element {
  return new Element('div', { class: 'controls', children: [searchInput, orderSelect] })
}

const searchInput = new Element('input', {
  type: 'text',
  placeholder: 'Search authors',
  'aria-label': 'Search',
  'data-action': 'filter-authors'
})
    
const orderSelect = new Element('select', {
  'aria-label': 'Order',
  'data-action': 'order-authors',
  children: [
    new Element('option', {
      value: 'published',
      innerHTML: 'chronological (first publication)'
    }),
    new Element('option', {
      value: 'birth',
      innerHTML: 'chronological (birth)'
    }),
    new Element('option', {
      value: 'alphabetical',
      innerHTML: 'alphabetical'
    })
  ]
})
