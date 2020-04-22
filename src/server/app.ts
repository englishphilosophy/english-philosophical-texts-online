import { App } from '../../deps.ts'
import home from './home.ts'
import texts from './texts.ts'
import * as search from './search.ts'
import compare from './compare.ts'
import * as about from './about.ts'
import javascript from './javascript.ts'
import data from './data.ts'
import errorHandler from './error.ts'

const app = new App()

app.route('GET', '/', home)
app.route('GET', '/texts/.*', texts)
app.route('GET', '/search', search.get)
app.route('POST', '/search', search.post)
app.route('GET', '/compare', compare)
app.route('GET', '/about', about.index)
app.route('GET', '/about/principles', about.principles)
app.route('GET', '/about/permissions', about.permissions)
app.route('GET', '/about/contact', about.contact)
app.route('GET', '/about/support', about.support)
app.route('GET', '/js/.*', javascript)
app.route('GET', '/data/.*', data)
app.error(errorHandler)

export default app
