import { registerAs } from '@nestjs/config'
import { env } from 'process'
import { Params } from 'nestjs-pino'

export enum LogLevel {
  SILENT = 'silent',
  TRACE = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal'
}
/**
 * Logger configuration
 */
const pino: Params = {
  pinoHttp: {
    messageKey: 'message',
    formatters: {
      level: (label: string) => ({ level: label }),
      bindings: (bindings: Record<string, unknown>) => ({ ...bindings, env: env.NODE_ENV })
    },
    useLevel: (env.LOG_LEVEL ?? (env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug)) as LogLevel,
    redact: {
      paths: ['variables.input.password', 'variables.input.smsCode'],
      censor: '__SENSITIVE_DATA__'
    }
  }
}
export const logger = registerAs('logger', () => pino)
