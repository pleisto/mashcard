import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { CoreModule } from './core/core.module'

/**
 * The root module of the server application.
 */
@Module({
  imports: [CommonModule, CoreModule]
})
export class AppModule {}
