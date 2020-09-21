import { element } from '../../deps_client.ts'

/** Controls for the library on the home page. */
export default element('div', { class: 'controls', children: [
  element('input', {
    type: 'text',
    placeholder: 'Search authors',
    'aria-label': 'Search',
    'data-action': 'filter-authors'
  }),
  element('select', {
    'aria-label': 'Order',
    'data-action': 'order-authors',
    children: [
      element('option', {
        value: 'published',
        innerHTML: 'chronological (first publication)'
      }),
      element('option', {
        value: 'birth',
        innerHTML: 'chronological (birth)'
      }),
      element('option', {
        value: 'alphabetical',
        innerHTML: 'alphabetical'
      })
    ]
  })
] })
