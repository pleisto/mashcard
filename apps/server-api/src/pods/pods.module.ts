import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './users'

/**
 * Pod module.
 *
 * A data pod is a place for storing documents, with mechanisms for controlling who can access what.
 * In Brickdoc, pods is an abstract used to represent tenants, which can be either users or spaces.
 */
@Module({
  imports: [UserModule, AuthModule]
})
export class PodsModule {}
