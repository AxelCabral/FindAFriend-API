import { SearchPetsUseCase } from '../search-pets'
import { PrismaPetsRepostiory } from '@/repositories/prisma/prisma-pets-repository'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepostiory()
  const useCase = new SearchPetsUseCase(petsRepository)

  return useCase
}
