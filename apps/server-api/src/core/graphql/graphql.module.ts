import { Module } from '@nestjs/common'
import { GraphQLModule as ApolloGraphQLModule } from '@nestjs/graphql'
import { join } from 'path/posix'
import { ApolloDriverWithEnvelop } from './apollo-envelop.driver'
import { ApolloDriverWithEnvelopConfig } from './apollo-envelop.interface'
import { HooksExplorer, HookType } from '../../common/server-plugin'
import { SettingsService } from '../../common/settings'
import { useLogging } from './logging.plugin'
import { IS_PROD_MODE } from '../../common/utils'
import { useDepthLimit } from '@envelop/depth-limit'
import { PluginOrDisabledPlugin } from '@envelop/core'

@Module({
  imports: [
    ApolloGraphQLModule.forRootAsync<ApolloDriverWithEnvelopConfig>({
      driver: ApolloDriverWithEnvelop,
      useFactory: (hookExplorer: HooksExplorer, settings: SettingsService) => {
        // Append envelop plugins from server-plugin's hooks
        const pluginsHook =
          (hookExplorer
            .findByType(HookType.GRAPHQL_ENVELOP_PLUGIN)
            .map(async hook => await hook.forHookAsync(settings)) as PluginOrDisabledPlugin[]) || []

        return {
          disableHealthCheck: true,
          sortSchema: true,
          debug: !IS_PROD_MODE,
          path: '/.internal-apis/$graph',
          autoSchemaFile: join(process.cwd(), 'db/schema.gql'),
          playground: true,
          autoTransformHttpErrors: false,
          buildSchemaOptions: {},
          envelopPlugins: [
            useLogging(),
            useDepthLimit({
              maxDepth: 10
            }),
            // Append envelop plugins from server-plugin's hooks
            ...pluginsHook
          ]
        }
      },
      inject: [HooksExplorer, SettingsService]
    })
  ]
})
export class GraphQLModule {}
