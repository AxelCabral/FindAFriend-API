import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyUsedError } from './errors/email-already-used-error'

interface RegisterOrgUseCaseRequest {
  name: string
  owner_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    owner_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailAlreadyUsedError()
    }

    const org = await this.orgsRepository.create({
      name,
      owner_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
