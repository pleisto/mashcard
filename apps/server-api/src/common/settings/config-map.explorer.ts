import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { DiscoveryService } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { uniq } from '@brickdoc/active-support'
import { ValidationError } from 'yup'
import { DuplicateNameSpaceError, ValueValidationError } from './settings.errors'
import { SettingsItem, ConfigMapProviders } from './settings.interface'
import { ConfigMapMetadataAccessor } from './config-map-metadata.accessor'

@Injectable()
export class ConfigMapExplorer implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: ConfigMapMetadataAccessor
  ) {}

  /**
   * A NestJS lifecycle hook that is called when the application is bootstrapped.
   */
  onApplicationBootstrap(): void {
    // Check if all config maps namespaces are unique on application bootstrap
    const uniqNamespaces = uniq(this.allNamespaces())
    if (uniqNamespaces.length !== this.allNamespaces().length)
      throw new DuplicateNameSpaceError(
        // duplicate namespaces
        this.allNamespaces().filter(n => uniqNamespaces.includes(n))
      )
  }

  /**
   * Get all providers that have @ConfigMap() decorator
   * @returns ConfigMap providers InstanceWrapper[]
   */
  providers(): ConfigMapProviders {
    const result: ConfigMapProviders = {}
    this.discoveryService.getProviders().forEach((wrapper: InstanceWrapper) => {
      const namespace = this.metadataAccessor.getConfigMapNamespace(wrapper)
      // filter out providers that don't have @ConfigMap() decorator
      if (namespace) result[namespace] = wrapper
    })
    return result
  }

  /**
   * Get all items.
   */
  all(): Array<SettingsItem<any>> {
    return Object.entries(this.providers()).flatMap(([namespace, wrapper]) =>
      this.getItemNames(wrapper).flatMap(name => {
        const item = this.getItem(wrapper, namespace, name)!
        return [
          {
            ...item,
            key: this.fullKey(namespace, name)
          }
        ]
      })
    )
  }

  /**
   * List all config maps namespaces from providers that have @ConfigMap() decorator
   */
  allNamespaces(): string[] {
    return Object.keys(this.providers())
  }

  /**
   * List all config maps items from providers that have @ConfigMap() decorator
   * @returns
   */
  allKeys(): string[] {
    return Object.entries(this.providers()).flatMap(([namespace, wrapper]) =>
      this.getItemNames(wrapper).map(name => this.fullKey(namespace, name))
    )
  }

  /**
   * Get config map item by InstanceWrapper and name
   */
  protected getItem(wrapper: InstanceWrapper, namespace: string, itemName: string): SettingsItem<unknown> | undefined {
    const options = this.metadataAccessor.getItemOptions(wrapper, itemName)
    const value = wrapper.instance[itemName]
    if (!options) return undefined
    if (options.validation) {
      try {
        options.validation.validateSync(value)
      } catch (e: any) {
        if (e instanceof ValidationError) throw new ValueValidationError(`${namespace}.${itemName}`, e)
        throw e
      }
    }
    return {
      key: this.fullKey(namespace, itemName),
      options,
      defaultValue: value
    }
  }

  /**
   * Get all item names from a given InstanceWrapper
   * @param InstanceWrapper
   * @returns
   */
  protected getItemNames(wrapper: InstanceWrapper): string[] {
    const propertyNames = Object.getOwnPropertyNames(wrapper.instance)
    return propertyNames.filter(name => this.metadataAccessor.getItemOptions(wrapper, name))
  }

  /**
   * Join namespace and key to a string
   */
  protected fullKey(namespace: string, key: string): string {
    return `${namespace}.${key}`
  }
}
