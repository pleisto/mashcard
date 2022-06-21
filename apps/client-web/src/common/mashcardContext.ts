import { createContext, Context } from 'react'

export const MashcardContext: Context<MashcardContext> = createContext(globalThis.mashcardContext)
MashcardContext.displayName = 'MashcardGlobalConfig'
