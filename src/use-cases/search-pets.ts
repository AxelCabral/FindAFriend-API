import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string | null
  size?: string | null
  independency_level?: string | null
  energy_level?: string | null
  environment?: string | null
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
      age: age !== null ? age : undefined,
      size: size !== null ? size : undefined,
      independency_level:
        independency_level !== null ? independency_level : undefined,
      energy_level: energy_level !== null ? energy_level : undefined,
      environment: environment !== null ? environment : undefined,
    })

    return {
      pets,
    }
  }
}
