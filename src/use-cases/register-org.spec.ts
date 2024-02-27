import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { EmailAlreadyUsedError } from './errors/email-already-used-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a new org with email twice', async () => {
    const email = 'axel@gmail.com'

    await sut.execute({
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

    await expect(() =>
      sut.execute({
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
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyUsedError)
  })
})
