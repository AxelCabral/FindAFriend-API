import { RegisterOrgUseCase } from '../register-org'
import { PrismaOrgsRepostiory } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepostiory()
  const useCase = new RegisterOrgUseCase(orgsRepository)

  return useCase
}
