import { Strategy } from 'passport-custom'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { SESSION_USER_KEY, UserSession } from '../auth.interface'

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
  async validate(req: FastifyRequest): Promise<UserSession> {
    const user = req.session.get(SESSION_USER_KEY)
    if (!user) {
      throw new UnauthorizedException('Unauthorized')
    }

    return user
  }
}
