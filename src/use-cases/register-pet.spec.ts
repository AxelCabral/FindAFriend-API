import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org-01',
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
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Founa',
      about: 'Super cute and fat cat, with blue eyes',
      age: '1 year',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet without org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Founa',
        about: 'Super cute and fat cat, with blue eyes',
        age: '1 year',
        size: 'Adult',
        energy_level: 'Low',
        independency_level: 'Medium',
        environment: 'Home',
        org_id: 'inexistent-org',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
