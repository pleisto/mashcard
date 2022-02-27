import { Module } from '@nestjs/common'
import { MetadataModule } from '../core/metadata/metadata.module'
import { MetadataController } from './grpc/core/metadata.controller'

@Module({
  controllers: [MetadataController],
  imports: [MetadataModule]
})
export class AntiCorruptionModule {}
