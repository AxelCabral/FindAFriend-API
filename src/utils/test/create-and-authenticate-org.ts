import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'TypeScript Organization',
      owner_name: 'Axel Cabral',
      email: 'axel@gmail.com',
      whatsapp: '+55 55 991332372',
      password: await hash('123456', 6),
      cep: '97574690',
      state: 'RS',
      city: 'Santana do Livramento',
      neighborhood: 'Centro',
      street: 'Rua teste, 80',
      latitude: -27.2092052,
      longitude: -49.6401091,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'axel@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    orgId: org.id,
  }
}
