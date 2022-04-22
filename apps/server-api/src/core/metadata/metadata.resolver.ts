import { Resolver, Query } from '@nestjs/graphql'
import { SettingsService } from '../../common/settings'
import { Metadata } from './metadata.model'

@Resolver((of: unknown) => Metadata)
export class MetadataResolver {
  constructor(private readonly settings: SettingsService, private readonly metadataModel: Metadata) {}

  @Query(returns => Metadata, {
    description: 'Return information about current Brickdoc server instance.'
  })
  async metadata(): Promise<Metadata> {
    const exposedSettings = (await this.settings.allExposedItems()).unwrapOr([])
    this.metadataModel.exposedSettings = Object.fromEntries(exposedSettings.map(item => [item.key, item.value]))

    return this.metadataModel
  }
}
