import { Server } from '../deps.ts'
import epto from '../src/server/app.ts'
import { error } from '../src/server/handler.ts'

const app = new Server({ port: 3001, handler: epto, onError: error })
app.listenAndServe()
