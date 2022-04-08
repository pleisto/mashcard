import { env } from 'process'
import { existsSync, readFileSync } from 'fs'
import { parse, DotenvConfigOptions, DotenvConfigOutput } from 'dotenv'
import { expand, DotenvExpandOutput } from 'dotenv-expand'

/**
 * concat multiple dotenv files and return contents as Buffer
 * @returns
 */
const currentEnvBuffer = (): Buffer => {
  const ENCODING = 'utf8'

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const nodeEnv = env.NODE_ENV || 'development'
  // dotenv file path
  const envFilePath = [
    `.env.${nodeEnv}.local`, // highest priority
    '.env.local', // 2nd priority
    `.env.${nodeEnv}`, // 3rd priority
    '.env' // last priority
  ]
  const content = envFilePath
    .reverse() // Make sure the low priority file is loaded first
    .filter(envFile => existsSync(envFile)) // Check if the file exists
    .map(envFile => readFileSync(envFile, ENCODING)) // Read the file
    .join(`\n`) // Join the files together
  return Buffer.from(content, ENCODING)
}

/**
 * @internal
 * debug logger
 * @param enabled
 * @param level
 * @param message
 * @param optionalParams
 */
function debugLog(enabled: boolean | undefined, level: 'warn' | 'info', message?: any, ...optionalParams: any[]): void {
  if (!enabled) return

  const msg = `[@brickdoc/dotenv] ${message}`
  switch (level) {
    case 'warn':
      console.warn(msg, ...optionalParams)
      break
    default:
      console.info(msg, ...optionalParams)
  }
}

/**
 * Parses the contents of dotenv files  and will return an Object with the parsed keys and values.
 */
export const parsedEnv = (): DotenvExpandOutput =>
  expand({
    ignoreProcessEnv: true,
    parsed: parse(currentEnvBuffer())
  })

export interface ConfigOptions extends Pick<DotenvConfigOptions, 'override' | 'debug'> {}

/**
 * Loads dotenv files contents into process.env.
 */
export function config(options: ConfigOptions = { override: false, debug: false }): DotenvConfigOutput {
  const { override, debug } = options
  const { parsed, error } = parsedEnv()

  if (!parsed) {
    debugLog(debug, 'warn', 'No .env content found')
    return { error }
  }

  debugLog(debug, 'info', 'Parsed env file contents:', parsed)
  Object.keys(parsed).forEach(key => {
    // Check if the key is already defined in process.env
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = parsed[key]
    } else {
      // When key is already defined in process.env check if it is allowed to override
      override
        ? (process.env[key] = parsed[key])
        : debugLog(debug, 'warn', `${key} is already defined in the environment and won't be overwritten.`)
    }
  })

  return { parsed, error }
}
