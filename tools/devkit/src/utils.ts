import { existsSync } from 'fs'
import { join } from 'path'
import { Client, QueryResult, QueryConfig } from 'pg'
import { isUrl, isNonEmptyString } from '@brickdoc/active-support'
import chalk from 'chalk'
import { ChildProcess, spawn, SpawnOptions } from 'child_process'

export { hideBin } from 'yargs/helpers'

export const currentCwd = process.cwd()
export const serverPath = 'apps/server-api'

/**
 * Check current directory is monorepo root
 */
export const isWorkspaceRoot = (): boolean => existsSync(join(process.cwd(), 'yarn.lock'))

/**
 * Run SQL query on postgres
 */
export async function pgQuery(dbUrl: string, query: QueryConfig): Promise<QueryResult> {
  if (!isUrl(dbUrl, 'postgres')) {
    throw new Error('dbUrl is not a valid postgres url')
  }
  const client = new Client(dbUrl)
  await client
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .on('drain', client.end.bind(client)) // disconnect client when all queries are done
    .connect()
    .catch(e => {
      errorLog('Error connecting to postgres')
      throw e
    })
  return await client.query(query).catch(e => {
    errorLog(`Error executing query: ${JSON.stringify(query)}\n${e.message}`)
    throw e
  })
}

/**
 * Change current working directory on function call
 * @param path path to change to
 * @param fn  function to run
 * @returns
 */
export const chCwd =
  (path: string, fn: Function): Function =>
  (...args: unknown[]) => {
    process.chdir(join(currentCwd, serverPath))
    const result = fn.apply(null, args)
    process.chdir(currentCwd)
    return result
  }

/**
 * Change current working directory to serverPath on function call
 * @param fn function to run
 * @returns
 */
export const chCwd2Server = (fn: Function): Function => chCwd(serverPath, fn)

/**
 * Get db url from config file
 */
export function getDbUrl(overrideDbName?: string): string {
  const dbUrl = process.env.DATABASE_URL
  if (!isNonEmptyString(dbUrl)) {
    errorLog('ENV.DATABASE_URL is not set')
    process.exit(1)
  }
  return isNonEmptyString(overrideDbName) ? dbUrl.replace(/[^/]+$/, `${overrideDbName}`) : dbUrl
}

/**
 * Get database name from config file
 */
export function currentDbName(): string {
  const url = getDbUrl()
  return url.substr(url.lastIndexOf('/') + 1)
}

export const successLog = (message: string): void => console.log(chalk.green(message))
export const errorLog = (message: string): void => console.error(chalk.red(`${chalk.bold('[Error]')} ${message}`))

/**
 * Run a command in a child process
 */
export async function runCommand(
  command: string,
  args: string[] = [],
  collect = false,
  cwd: string = process.cwd()
): Promise<null | string> {
  const options: SpawnOptions = {
    cwd,
    stdio: collect ? 'pipe' : 'inherit',
    shell: true
  }
  return await new Promise<null | string>((resolve, reject) => {
    const child: ChildProcess = spawn(`${command}`, args, options)
    if (collect) child.stdout!.on('data', data => resolve(data.toString().replace(/\r\n|\n/, '')))
    child.on('close', code => {
      if (code === 0) {
        resolve(null)
      } else {
        const msg = `Command ${command} (${args}) failed with code ${code}`
        errorLog(msg)
        reject(msg)
      }
    })
  })
}
