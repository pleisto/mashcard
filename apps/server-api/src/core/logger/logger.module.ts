import { Module } from '@nestjs/common'
import { env } from 'process'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'

const localFormats =
  env.NODE_ENV === 'development'
    ? [
        format.prettyPrint({
          colorize: true
        })
      ]
    : []

@Module({
  imports: [
    WinstonModule.forRoot({
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: format.combine(format.timestamp(), format.json(), ...localFormats),
      transports: [new transports.Console()]
    })
  ]
})
export class LoggerModule {}
