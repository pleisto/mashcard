import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'
import { IS_DEV_MODE, IS_PROD_MODE } from '../../common/utils'

const localFormats = IS_DEV_MODE
  ? [
      format.prettyPrint({
        colorize: true
      })
    ]
  : []

@Module({
  imports: [
    WinstonModule.forRoot({
      level: IS_PROD_MODE ? 'info' : 'debug',
      format: format.combine(format.timestamp(), format.json(), ...localFormats),
      transports: [new transports.Console()]
    })
  ]
})
export class LoggerModule {}
