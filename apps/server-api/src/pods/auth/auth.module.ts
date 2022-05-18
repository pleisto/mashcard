import { Module } from '@nestjs/common'
import { UserModule } from '../users'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { SessionStrategy } from './strategies/session.strategy'

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, SessionStrategy],
  exports: [AuthService]
})
export class AuthModule {}
