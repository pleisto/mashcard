import { NestFastifyApplication } from '@nestjs/platform-fastify'
import path from 'path'
import handlebars from 'handlebars'

export const viewEngineRegister = (app: NestFastifyApplication): void => {
  app.setViewEngine({ engine: { handlebars }, templates: path.resolve(__dirname, '../views/templates') })
  app.useStaticAssets({ root: path.resolve(__dirname, '../../../../../public'), index: false, wildcard: false })
}
