import { Controller, Get } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { MetadataResolver } from '../../../core/metadata/metadata.resolver'
import { Metadata } from '../../../core/metadata/metadata.model'
import { pick } from '@brickdoc/active-support'

@Controller()
export class MetadataController {
  constructor(private readonly resolver: MetadataResolver) {}

  @Get()
  @GrpcMethod('MetadataService', 'GetMetadata')
  async findMetadata(): Promise<Pick<Metadata, 'appEnv' | 'supportedTimezones' | 'supportedLocales'>> {
    const resp = await this.resolver.metadata()
    return pick(resp, ['appEnv', 'supportedTimezones', 'supportedLocales'])
  }
}
