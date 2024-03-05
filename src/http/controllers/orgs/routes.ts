import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
