import { currentEnvFile, dotEnvConfig } from '@brickdoc/dotenv'
import { chCwd2Server, serverPath } from './utils'

// ref: https://github.com/motdotla/dotenv/issues/133
const path = `${serverPath}/${chCwd2Server(currentEnvFile)()}`
dotEnvConfig({ path })
