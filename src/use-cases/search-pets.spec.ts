import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase
let create: RegisterPetUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
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

    await create.execute({
      name: 'Founa',
      about: 'Super cute and fat cat, with blue eyes',
      age: '2 years',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-01',
    })

    await create.execute({
      name: 'Founa-2',
      about: 'Super cute and fat cat, with blue eyes',
      age: '1 year',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-01',
    })

    await orgsRepository.create({
      id: 'org-02',
      name: 'JavaScript Organization',
      owner_name: 'Axel Cabral',
      email: 'axel2@gmail.com',
      whatsapp: '+55 55 991332372',
      password: '123456',
      cep: '97574690',
      state: 'RS',
      city: 'Alegrete',
      neighborhood: 'Centro',
      street: 'Rua teste, 80',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await create.execute({
      name: 'Founa-3',
      about: 'Super cute and fat cat, with blue eyes',
      age: '1 year',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-02',
    })

    await create.execute({
      name: 'Founa-4',
      about: 'Super cute and fat cat, with blue eyes',
      age: '1 year',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-02',
    })

    await orgsRepository.create({
      id: 'org-03',
      name: 'PHP Organization',
      owner_name: 'Axel Cabral',
      email: 'axel3@gmail.com',
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

    await create.execute({
      name: 'Founa-5',
      about: 'Super cute and fat cat, with blue eyes',
      age: '1 year',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-03',
    })

    await create.execute({
      name: 'Founa-6',
      about: 'Super cute and fat cat, with blue eyes',
      age: '2 years',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
      org_id: 'org-03',
    })
  })

  it('should be able to search for pets by organization city', async () => {
    const { pets } = await sut.execute({
      city: 'Santana do Livramento',
      size: 'Adult',
      energy_level: 'Low',
      independency_level: 'Medium',
      environment: 'Home',
    })

    expect(pets).toHaveLength(4)
  })

  it('should be able to search for pets only passing city', async () => {
    const { pets } = await sut.execute({
      city: 'Santana do Livramento',
    })

    expect(pets).toHaveLength(4)
  })

  it('should be able to search pets by features', async () => {
    const { pets } = await sut.execute({
      city: 'Santana do Livramento',
      age: '2 years',
      size: 'Adult',
    })
    console.log({ pets })

    expect(pets).toHaveLength(2)
  })
})
