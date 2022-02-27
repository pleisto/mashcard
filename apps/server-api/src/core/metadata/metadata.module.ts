import { Module } from '@nestjs/common'
import { Metadata } from './metadata.model'
import { MetadataResolver } from './metadata.resolver'

@Module({
  providers: [Metadata, MetadataResolver],
  exports: [MetadataResolver]
})
export class MetadataModule {}
