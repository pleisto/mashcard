import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './users'

/**
 * Accounts Module
 */
@Module({
  imports: [UserModule, AuthModule]
})
export class AccountsModule {}
