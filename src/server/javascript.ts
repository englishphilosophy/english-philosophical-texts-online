import {
  existsSync,
  Request,
  JavascriptResponse,
  HttpError
} from '../../deps.ts'

export default async function index (request: Request): Promise<JavascriptResponse> {
  const filePath = request.path.replace(/^\/js/, './src').replace(/\.js$/, '.ts')

  if (!existsSync(filePath)) {
    throw new HttpError(404, 'File not found.')
  }

  const [diagnostics, javascript] = await Deno.bundle(filePath, undefined, compilerOptions)

  if (diagnostics) {
    throw new HttpError(500, `Bad javascript.`)
  }

  return new JavascriptResponse(javascript)
}

const compilerOptions = {
  lib: ['dom', 'es6', 'es2017'],
  removeComments: true
}
