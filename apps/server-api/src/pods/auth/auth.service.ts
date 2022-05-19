import { Inject, Injectable } from '@nestjs/common'
import { User } from '../users/user.object-type'
import { SESSION_USER_KEY, UserSession } from './auth.interface'
import { type FastifyRequest } from 'fastify'
import { type Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

@Injectable()
export class AuthService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  /**
   * Create session for user.
   */
  async createSession(req: FastifyRequest, user: UserSession): Promise<void> {
    this.logger.info({ trace: req.id, user, context: 'CreateSession' })
    req.session.set(SESSION_USER_KEY, user)
  }

  async validate({ body }: Request): Promise<User | null> {
    return null
  }
}
