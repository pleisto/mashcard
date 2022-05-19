import { UseGuards } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'
import type { UserSession } from '../auth'
import { CurrentUser } from '../auth/currentUser.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { User } from './user.object-type'
import { UserService } from './user.service'

@Resolver((of: unknown) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, {
    description: 'Get information about current user.'
  })
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: UserSession): Promise<User> {
    const result = await this.userService.getUserById(user.id)
    if (result.isErr()) throw result.error
    return result.value
  }
}
