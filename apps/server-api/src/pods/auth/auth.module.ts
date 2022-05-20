import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { SessionStrategy } from './strategies/session.strategy'

@Module({
  imports: [PassportModule],
  providers: [AuthService, SessionStrategy],
  exports: [AuthService]
})
export class AuthModule {}
