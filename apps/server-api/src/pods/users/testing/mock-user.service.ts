import { Result, ok } from '@brickdoc/active-support'
import { User } from '../user.object-type'

export const mockUserService = {
  async getUserById(id: number): Promise<Result<User, Error>> {
    return ok({
      id,
      slug: `user-${id}`,
      name: `User ${id}`,
      bio: null,
      avatarUrl: null,
      isInitialized: false,
      lockedAt: null,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    })
  }
}
