import { BrickdocContext } from '../brickdocContext'

export const rootPath = (context: BrickdocContext): string =>
  context.lastWebid && context.lastBlockIds && context.lastBlockIds[context.lastWebid!]
    ? `/${context.lastWebid}/${context.lastBlockIds[context.lastWebid!]}`
    : `/${context.currentPod.webid}`
