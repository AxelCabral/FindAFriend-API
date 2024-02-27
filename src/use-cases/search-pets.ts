import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  independency_level?: string
  energy_level?: string
  environment?: string
}
interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    independency_level,
    energy_level,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      independency_level,
      energy_level,
      environment,
    })

    return {
      pets,
    }
  }
}
