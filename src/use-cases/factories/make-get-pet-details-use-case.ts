import { GetPetDetailsUseCase } from '../get-pet-details'
import { PrismaPetsRepostiory } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepostiory()
  const useCase = new GetPetDetailsUseCase(petsRepository)

  return useCase
}
