import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findAll(params: FindAllParams) {
    const cityOrgs = this.orgsRepository.items.filter(
      (item) => item.city === params.city,
    )

    const pets = this.items
      .filter((item) => cityOrgs.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.independency_level
          ? item.independency_level === params.independency_level
          : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      org_id: data.org_id,
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment: data.environment,
    }

    this.items.push(pet)

    return pet
  }
}
