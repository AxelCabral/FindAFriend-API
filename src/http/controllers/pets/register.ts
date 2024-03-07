import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independency_level: z.string(),
    environment: z.string(),
    org_id: z.string().uuid(),
  })

  const {
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    org_id,
  } = registerBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()
  try {
    const { pet } = await registerPetUseCase.execute({
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment,
      org_id,
    })

    return reply.status(201).send(pet)
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
