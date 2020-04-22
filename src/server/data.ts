import {
  existsSync,
  readFileStrSync,
  Request,
  JsonResponse,
  HttpError
} from '../../deps.ts'

export default function index (request: Request): JsonResponse {
  const filePath = request.path.replace(/^\/data/, '../english-philosophical-texts/build')

  if (!existsSync(filePath)) {
    throw new HttpError(404, 'File not found.')
  }

  return new JsonResponse(readFileStrSync(filePath))
}
