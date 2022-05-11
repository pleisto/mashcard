import { Module } from '@nestjs/common'
import { IndexController } from './controllers/index.controller'
import { WebAppModule } from '@brickdoc/build-support'

@Module({
  imports: [WebAppModule],
  controllers: [IndexController]
})
export class ViewsModule {}
