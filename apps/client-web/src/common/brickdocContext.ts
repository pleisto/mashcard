import { createContext, Context } from 'react'

export const BrickdocContext: Context<BrickdocContext> = createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'
