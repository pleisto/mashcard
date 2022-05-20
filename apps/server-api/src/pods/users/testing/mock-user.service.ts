import { ok, err } from '@brickdoc/active-support'
import { UserService } from '../user.service'

export const findUserByIdSpyFunction: UserService['findUserById'] = async id => {
  if (id === 0) {
    return err(new Error('User not found'))
  }
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
