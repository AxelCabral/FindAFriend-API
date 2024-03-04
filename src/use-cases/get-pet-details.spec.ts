import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details'
import { RegisterPetUseCase } from './register-pet'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase
let create: RegisterPetUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
    create = new RegisterPetUseCase(petsRepository, orgsRepository)

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

  it('should be able to get details about a specific pet', async () => {
    const pet = await create.execute({
      id: 'Cat-01',
      name: 'Founa',
      about: 'Super cute and fat cat, with blue eyes',
      age: '2 years',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-01',
    })

    const getDetailsResult = await sut.execute({
      id: 'Cat-01',
    })

    expect(getDetailsResult).toEqual(pet)
  })

  it('should not be able to get details about a nonexistent pet', async () => {
    await expect(
      sut.execute({
        id: 'Cat-02',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
