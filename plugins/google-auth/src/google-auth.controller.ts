import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './google-auth.guard'
import { AuthService } from '@brickdoc/server-api/src/pods/auth'
import { AUTH_REDIRECT_PATH } from '@brickdoc/server-api/src/pods/users'
import type { FastifyReply, FastifyRequest } from 'fastify'

@Controller('accounts/auth/google_oauth2')
export class GoogleAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() _req: FastifyRequest): Promise<void> {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<any> {
    await this.authService.createSession(req, req.user)
    // Redirect
    return await res.status(302).redirect(AUTH_REDIRECT_PATH)
  }
}
