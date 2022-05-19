import { Module } from '@nestjs/common'
import { PodsModule } from './pods/pods.module'
import { CommonModule } from './common/common.module'
import { CoreModule } from './core/core.module'

/**
 * The root module of the server application.
 */
@Module({
  imports: [CommonModule, CoreModule, PodsModule]
})
export class AppModule {}
