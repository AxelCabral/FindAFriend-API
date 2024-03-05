// fastify-jwt.d.ts
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    org: {
      sub: string
    } // user type is return type of `request.org` object
  }
}
