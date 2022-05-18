import { Module } from '@nestjs/common'
import { AccountsModule } from './pods/accounts.module'
import { CommonModule } from './common/common.module'
import { CoreModule } from './core/core.module'

/**
 * The root module of the server application.
 */
@Module({
  imports: [CommonModule, CoreModule, AccountsModule]
})
export class AppModule {}
