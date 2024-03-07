import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { search } from './search'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/pets', search)
  app.get('/pet/:id', details)

  /** Authenticated */
  app.post('/pets/:org_id/register', { onRequest: [verifyJWT] }, register)
}
