import { Module } from '@nestjs/common'
import { Metadata } from './metadata.object-type'
import { MetadataResolver } from './metadata.resolver'

@Module({
  providers: [Metadata, MetadataResolver]
})
export class MetadataModule {}
