import { MashcardContext } from '../mashcardContext'

export const rootPath = (context: MashcardContext): string =>
  context.lastDomain && context.lastBlockIds && context.lastBlockIds[context.lastDomain!]
    ? `/${context.lastDomain}/${context.lastBlockIds[context.lastDomain!]}`
    : `/${context.currentPod.domain}`
