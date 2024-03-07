import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get details from a pet', async () => {
    const { token, orgId } = await createAndAuthenticateOrg(app)

    const petResponse = await request(app.server)
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

    const petId = petResponse.body.id

    const petDetailsResponse = await request(app.server)
      .get(`/pet/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(petDetailsResponse.statusCode).toEqual(200)
    expect(petDetailsResponse.body.pet).toEqual(
      expect.objectContaining({
        about: 'Super cute and fat cat, with blue eyes',
      }),
    )
  })
})
