import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('session') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context)

    // TODO mock request here
    // console.log('getRequest', ctx, ctx.getContext())
    return ctx.getContext().req
  }
}
