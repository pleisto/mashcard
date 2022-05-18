import { Controller, Get, Req } from '@nestjs/common'
import { AuthService } from '@brickdoc/server-api/src/pods/auth'
import { UserService } from '@brickdoc/server-api/src/pods/users'
import { type FastifyRequest } from 'fastify'

@Controller('mock')
export class MockAuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Get('login_as_real_user')
  async loginAsRealUser(@Req() req: FastifyRequest): Promise<void> {
    const slug = (req.query as any).slug
    if (!slug) throw new Error('slug is required')
    const result = await this.userService.getUserBySlug(slug)
    if (result.isErr()) throw result.error

    await this.authService.createSession(req, result.value!)
  }

  @Get('login_as_virtual_user')
  async loginAsVirtualUser(@Req() req: FastifyRequest): Promise<void> {
    const slug: string = (req.query as any).slug
    if (!slug) throw new Error('slug is required')
    const id: number = (req.query as any).id
    if (!id) throw new Error('id is required')

    await this.authService.createSession(req, { slug, id })
  }
}
