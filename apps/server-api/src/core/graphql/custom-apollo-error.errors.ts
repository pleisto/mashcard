import { ApolloError } from 'apollo-server-errors'

export class CustomApolloError extends ApolloError {
  constructor(name: string, message: string, code?: string, extensions?: Record<string, any>) {
    super(message, code, extensions)
    Object.defineProperty(this, 'name', { value: name })
  }
}
