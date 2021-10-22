import { makeVar } from '@apollo/client'
import { EditorContentProps } from '@brickdoc/editor'

export const editorVar = makeVar<EditorContentProps['editor']>(null)
export const isSavingVar = makeVar(false)
