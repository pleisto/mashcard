import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolve'
import { UserService } from './user.service'

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserResolver]
})
export class UserModule {}
