export const command = 'server'
export const describe = 'Run Brickdoc API server.'
export const aliases = ['s']
export const builder = {}
export const handler = (_args: string[]): void => {
  throw new Error('This command should be directly executed by `main.ts`.')
}
