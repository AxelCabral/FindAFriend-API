import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'TypeScript Organization',
      owner_name: 'Axel Cabral',
      email: 'axel@gmail.com',
      whatsapp: '+55 55 991332372',
      password: '123456',
      cep: '97574690',
      state: 'RS',
      city: 'Santana do Livramento',
      neighborhood: 'Centro',
      street: 'Rua teste, 80',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a org with email twice', async () => {
    const email = 'teste@gmail.com'

    await request(app.server).post('/orgs').send({
      name: 'TypeScript Organization',
      owner_name: 'Axel Cabral',
      email,
      whatsapp: '+55 55 991332372',
      password: '123456',
      cep: '97574690',
      state: 'RS',
      city: 'Santana do Livramento',
      neighborhood: 'Centro',
      street: 'Rua teste, 80',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const response = await request(app.server).post('/orgs').send({
      name: 'TypeScript Organization',
      owner_name: 'Axel Cabral',
      email,
      whatsapp: '+55 55 991332372',
      password: '123456',
      cep: '97574690',
      state: 'RS',
      city: 'Santana do Livramento',
      neighborhood: 'Centro',
      street: 'Rua teste, 80',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(response.statusCode).toEqual(409)
  })
})
