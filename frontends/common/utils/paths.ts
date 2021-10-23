import { BrickdocContext } from '../brickdocContext'

export const rootPath = (context: BrickdocContext): string =>
  context.lastBlockIds ? `/${context.lastWebid}/${context.lastBlockIds[context.lastWebid!]}` : `/${context.currentPod.webid}`
