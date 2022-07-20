import { currentPodUsername } from './currentPodUsername'

export const rootPath = (context: MashcardContext): string =>
  context.lastDomain && context.lastBlockIds && context.lastBlockIds[context.lastDomain!]
    ? `/${context.lastDomain}/${context.lastBlockIds[context.lastDomain!]}`
    : `/${currentPodUsername(context)}`
