import { BrickdocContext } from '../brickdocContext'

export const rootPath = (context: BrickdocContext): string =>
  context.lastDomain && context.lastBlockIds && context.lastBlockIds[context.lastDomain!]
    ? `/${context.lastDomain}/${context.lastBlockIds[context.lastDomain!]}`
    : `/${context.currentPod.domain}`
