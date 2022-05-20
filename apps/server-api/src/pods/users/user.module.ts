import { Module } from '@nestjs/common'
import { AuthModule } from '../auth'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  imports: [AuthModule]
})
export class UserModule {}
