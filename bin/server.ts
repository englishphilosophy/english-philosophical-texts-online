import { App } from '../deps.ts'
import epto from '../src/server/app.ts'
import { error } from '../src/server/handler.ts'

const app = new App(epto, error)
app.listen(3001)
