import { Prisma, Pet } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independency_level?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  // findByFeatures(data: FindAllParams): Promise<Pet[]>
  // listAllPets(city: string): Promise<Pet[]>
  // findById(id: string): Promise<Pet>
}
