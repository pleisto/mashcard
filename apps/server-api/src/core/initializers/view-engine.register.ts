import { NestFastifyApplication } from '@nestjs/platform-fastify'
import path from 'path'
import handlebars from 'handlebars'
import { MONOREPO_ROOT, SERVER_SRC_ROOT } from '../../common/utils'

export const viewEngineRegister = (app: NestFastifyApplication): void => {
  app.setViewEngine({ engine: { handlebars }, templates: path.resolve(SERVER_SRC_ROOT, 'core/views/templates') })
  app.useStaticAssets({ root: path.resolve(MONOREPO_ROOT, 'public'), index: false, wildcard: false })
}
