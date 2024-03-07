import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const routeSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = routeSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  try {
    const { pet } = await getPetDetailsUseCase.execute({ id })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
