import { App } from '../../deps.ts'
import * as routes from './routes.ts'

/** The web application. */
const app = new App()

app.route('GET',  '/', routes.home)
app.route('GET',  '/research', routes.research)
app.route('GET',  '/research(/.*?)', routes.research)
app.route('GET',  '/about(/.*)?', routes.about)
app.route('GET',  '/favicon.ico', routes.favicon)
app.route('GET',  '/leviathan.jpg', routes.leviathan)
app.route('GET',  '/js/.*', routes.javascript)
app.route('GET',  '/data/.*', routes.data)
app.route('POST',  '/search', routes.search)
app.route('GET',  '/texts/.*', routes.text)
app.error(routes.error)

export default app
