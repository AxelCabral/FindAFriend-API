import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredencialsError } from '@/use-cases/errors/invalid-credencials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: org.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: org.id,
        expiresIn: '14d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredencialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
