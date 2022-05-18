import { Injectable } from '@nestjs/common'
import { UserCredentialInput } from './user.interface'
import { InjectPool, type DatabasePool } from '@brickdoc/nestjs-slonik'
import { User } from './user.model'
import { createUserByCredential, findCredential, findUserById, findUserBySlug } from './user.sql-builder'
import { err, Result } from '@brickdoc/active-support'
@Injectable()
export class UserService {
  constructor(@InjectPool() private readonly pool: DatabasePool) {}

  /**
   * Find or create a user by credential
   * @param credential
   */
  async findOrCreateUser(credential: UserCredentialInput): Promise<Result<User, Error>> {
    const credentialResult = await findCredential(this.pool, credential.provider, credential.subject)
    if (credentialResult.isErr()) return err(credentialResult.error)

    // if credential found in database, return user
    if (credentialResult.value) {
      return await findUserById(this.pool, credentialResult.value.podId)
    }

    // if credential is not found, create user
    return await createUserByCredential(this.pool, credential)
  }

  /**
   * Get a user by id
   * @param id
   */
  async getUserById(id: number): Promise<Result<User, Error>> {
    return await findUserById(this.pool, id)
  }

  /**
   * Get a user by slug
   */
  async getUserBySlug(slug: string): Promise<Result<User, Error>> {
    return await findUserBySlug(this.pool, slug)
  }
}
