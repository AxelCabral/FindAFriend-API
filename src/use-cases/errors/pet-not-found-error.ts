export class PetNotFoundError extends Error {
  constructor() {
    super('The Pet was not found')
  }
}
