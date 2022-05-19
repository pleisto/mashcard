import { Module } from '@nestjs/common'
import { HashedID, URL } from './index'
@Module({
  providers: [HashedID, URL]
})
export class ScalarsModule {}
