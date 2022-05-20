import { forwardRef, Inject, UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Context, type GqlExecutionContext, Args } from '@nestjs/graphql'
import { AuthService, type UserSession } from '../auth'
import { CurrentUser } from '../auth/currentUser.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { UserAppearance } from './models/user_appearance.object-type'
import { UserAppearanceUpdateInput } from './models/user_appearance_update.input-type'
import { User } from './user.object-type'
import { UserService } from './user.service'

@Resolver((of: unknown) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) {}

  @Query(() => User, {
    description: 'Get information about current user.'
  })
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: UserSession): Promise<User> {
    const result = await this.userService.findUserById(user.id)
    if (result.isErr()) throw result.error
    return result.value
  }

  @Mutation(() => Boolean, {
    description: 'Logout current user.'
  })
  @UseGuards(GqlAuthGuard)
  async logout(@Context() ctx: GqlExecutionContext): Promise<boolean> {
    // TODO add type: `ctx.req`
    return await this.authService.deleteSession((ctx as any).req)
  }

  @Query(() => UserAppearance, { description: 'Query user appearance.' })
  @UseGuards(GqlAuthGuard)
  async userAppearance(@CurrentUser() user: UserSession): Promise<UserAppearance> {
    const result = await this.userService.findUserApprearance(user)
    if (result.isErr()) throw result.error
    return result.value
  }

  @Mutation(() => Boolean, {
    description: 'Update user appearance.'
  })
  @UseGuards(GqlAuthGuard)
  async userAppearanceUpdate(
    @CurrentUser() user: UserSession,
    @Args('input') input: UserAppearanceUpdateInput
  ): Promise<boolean> {
    const result = await this.userService.updateUserAppearance(user, input)
    if (result.isErr()) throw result.error
    return result.value
  }
}
