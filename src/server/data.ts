import {
  existsSync,
  readFileStrSync,
  Request,
  JsonResponse,
  HttpError
} from '../../deps.ts'

export default function index (request: Request): JsonResponse {
  let path = request.path.replace(/^\/data/, '../english-philosophical-texts/build')

  if (!existsSync(path)) {
    path = path.replace(/\.json$/, '/index.json')
  }

  if (!existsSync(path)) {
    throw new HttpError(404, 'File not found.')
  }

  return new JsonResponse(readFileStrSync(path))
}
