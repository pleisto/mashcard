import { ApolloDriver } from '@nestjs/apollo'
import { ApolloDriverWithEnvelopConfig } from './apollo-envelop.interface'
import { envelop, useSchema } from '@envelop/core'

/**
 * Apollo driver with envelop support for NestJS GraphQL
 *
 * Envelop provides a low-level hook-based plugin API for developers. By combining plugins, you can compose your
 * own GraphQL "framework", and get a modified version of GraphQL with the capabilities you need.
 *
 * @see https://www.envelop.dev/
 *
 */
export class ApolloDriverWithEnvelop extends ApolloDriver {
  public async registerServer(options: ApolloDriverWithEnvelopConfig): Promise<void> {
    const getEnveloped = envelop({
      plugins: [useSchema(options.schema!), ...(options.envelopPlugins ?? [])]
    })
    await super.registerServer({
      ...options,
      executor: async requestContext => {
        const { schema, execute, contextFactory } = getEnveloped({ req: requestContext.context.req })
        // eslint-disable-next-line @typescript-eslint/return-await
        return execute({
          schema,
          document: requestContext.document,
          contextValue: await contextFactory(),
          variableValues: requestContext.request.variables,
          operationName: requestContext.operationName
        })
      }
    })
  }
}
