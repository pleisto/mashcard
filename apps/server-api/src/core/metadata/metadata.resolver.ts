import { Metadata } from './metadata.model'
import { Resolver, Query } from '@nestjs/graphql'

@Resolver((of: unknown) => Metadata)
export class MetadataResolver {
  constructor(private readonly metadataModel: Metadata) {}

  @Query(returns => Metadata, {
    description: 'Return information about current Brickdoc server instance.'
  })
  async metadata(): Promise<Metadata> {
    return this.metadataModel
  }
}
