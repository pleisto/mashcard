import { Injectable } from '@nestjs/common'
import { DiscoveryService } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { HookMetadataAccessor } from './hook-metadata.accessor'
import { HookType, HookProvider } from './server-plugin.interface'

@Injectable()
export class HooksExplorer {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: HookMetadataAccessor
  ) {}

  /**
   * Find all hooks by type that have @ServerPluginHook() decorator
   */
  findByType<T extends HookType>(type: T): Array<HookProvider<T>> {
    return this.discoveryService
      .getProviders()
      .filter((wrapper: InstanceWrapper) => this.metadataAccessor.getHook(wrapper) === type)
      .map(wrapper => wrapper.instance as HookProvider<T>)
  }
}
