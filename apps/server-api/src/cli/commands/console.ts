import { Styles as S } from '../utils'

export const command = 'console'
export const describe = `${S.Bold}Deprecated:${S.ResetBold} Use \`NodeJS Debugger\` instead.`
export const aliases = ['c']
export const builder = {}
export const handler = (_args: string[]): void => {
  console.error(
    `${S.FgRed}${S.Bold} REPL is deprecated.${S.ResetAll}\n\n`,
    'Please use `NodeJS Debugger` instead.',
    `${S.Bold}And you can use \`ctx\` to access the application context in debug console.${S.ResetBold}\n`,
    'See https://code.visualstudio.com/docs/nodejs/nodejs-debugging for more information.\n'
  )
}
