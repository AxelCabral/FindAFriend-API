import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by features', async () => {
    const { token, orgId } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post(`/pets/${orgId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Founa',
        about: 'Super cute and fat cat, with blue eyes',
        age: '1 year',
        size: 'Adult',
        energy_level: 'Low',
        independency_level: 'Medium',
        environment: 'Home',
        org_id: orgId,
      })

    await request(app.server)
      .post(`/pets/${orgId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Founa-3',
        about: 'Super cute and fat cat, with blue eyes',
        age: '1 year',
        size: 'Adult',
        energy_level: 'Low',
        independency_level: 'Medium',
        environment: 'Home',
        org_id: orgId,
      })

    await request(app.server)
      .post(`/pets/${orgId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Founa-2',
        about: 'Super cute and fat cat, with blue eyes',
        age: '2 years',
        size: 'Adult',
        energy_level: 'Low',
        independency_level: 'Medium',
        environment: 'Home',
        org_id: orgId,
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Santana do Livramento',
        age: '1 year',
        size: 'Adult',
        energy_level: 'Low',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
