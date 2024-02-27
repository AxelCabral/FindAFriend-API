export class OrgNotFoundError extends Error {
  constructor() {
    super('The Organization was not found')
  }
}
