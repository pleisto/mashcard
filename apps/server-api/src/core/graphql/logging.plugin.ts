import { Plugin } from '@envelop/types'
import { useLogger } from '@envelop/core'
import { Logger } from '@nestjs/common'
import { requestLoggingContext } from '@brickdoc/server-api/src/common/utils'

const logger = new Logger('GraphQLModule')

export const useLogging = (): Plugin =>
  useLogger({
    skipIntrospection: false,
    logFn: (eventName, { args }) => {
      const req = args?.contextValue?.req
      logger.log({
        message: eventName,
        trace: req?.id,
        httpRequest: {
          ...requestLoggingContext(req),
          operationName: args.operationName
        }
      })
    }
  })
