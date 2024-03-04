import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetsRepostiory } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepostiory } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepostiory()
  const orgsRepository = new PrismaOrgsRepostiory()
  const useCase = new RegisterPetUseCase(petsRepository, orgsRepository)

  return useCase
}
