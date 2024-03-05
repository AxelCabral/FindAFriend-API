import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // app.post('/orgs', { onRequest: [verifyJWT] }, create)
}
