import { Module } from '@nestjs/common'
import { UserSession } from '../auth'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolve'
import { UserService } from './user.service'

declare module 'fastify' {
  interface FastifyRequest {
    user: UserSession
  }
}

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserResolver]
})
export class UserModule {}
