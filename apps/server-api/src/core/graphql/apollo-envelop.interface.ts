import { ApolloDriverConfig } from '@nestjs/apollo'
import { PluginOrDisabledPlugin } from '@envelop/core'

export interface ApolloDriverWithEnvelopConfig extends Omit<ApolloDriverConfig, 'executor' | 'executorFactory'> {
  /**
   * Envelop plugins
   * @see https://www.envelop.dev/plugins
   */
  envelopPlugins?: PluginOrDisabledPlugin[]
}
