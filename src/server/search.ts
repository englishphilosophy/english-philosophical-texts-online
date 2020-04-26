import {
  Element,
  Request,
  HtmlResponse
} from '../../deps.ts'
import Page from '../pages/page.ts'

export function get (request: Request): HtmlResponse {
  return new Page({ section: 'Search', main: [
    new Element('h1', { innerHTML: 'Search' }),
    searchForm(request)
  ] })
}

export async function post (request: Request): Promise<HtmlResponse> {
  const params = await request.postParams()

  return new Page({ section: 'Search', main: [
    new Element('h1', { innerHTML: 'Search' }),
    searchForm(request),
    new Element('pre', {
      css: { 'white-space': 'pre-wrap' },
      innerHTML: `text: ${params.get('text')}, query11: ${params.get('query11')}`
    })
  ] })
}

function searchForm (request: Request): Element {
  return new Element('form', {
    method: 'post',
    children: [
      text(request),
      query(1, 'Contains', request),
      query(2, 'But not', request),
      options(request),
      new Element('div', {
        children: [
          new Element('button', { type: 'submit', innerHTML: 'Search' })
        ]
      })
    ]
  })
}

function text (request: Request): Element {
  return new Element('div', { innerHTML: `<div class="group">
  <datalist id="texts">
    <option value="Astell">
    <option value="Berkeley">
    <option value="Hume">
    <option value="Hutcheson">
    <option value="Locke">
    <option value="Mandeville">
     <option value="Norris">
    <option value="Shaftesbury">
  </datalist>
  <label class="label" for="ids">Text:</label>
  <div class="inputs">
    <input list="texts" name="text" data-action="id-list" data-list="texts" class="stretch" required value="">
  </div>
</div>
` })
}

function query (id: number, label: string, request: Request): Element {
  return new Element('div', { innerHTML: `<div class="group">
  <label class="label" for="query${id}1">${label}:</label>
  <div class="inputs">
    <input type="text" name="query${id}1" id="query${id}1" ${(id === 1) ? 'required ' : ''}value="">
    <select name="query${1}op" class="narrow">
      <option value="and">AND</option>
      <option value="or">OR</option>
    <select>
    <input type="text" name="query${id}2" id="query${id}2" value="">
  </div>
</div>` })
}

function options (request: Request): Element {
  return new Element('div', { innerHTML: `<div class="group">
  <label class="label">Options:</label>
  <div class="inputs checkboxes">
    <label><input type="checkbox" name="ignorePunctuation" checked> Ignore Punctuation</label>
    <label><input type="checkbox" name="wholeWords" checked> Match Whole Words</label>
    <label><input type="checkbox" name="variantSpellings" checked> Match Variant Spellings</label>
  </div>
</div>` })
}
