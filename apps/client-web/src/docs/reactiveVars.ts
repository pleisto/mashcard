import { makeVar } from '@apollo/client'
import { EditorContentProps } from '@brickdoc/editor'
import { ContextInterface } from '@brickdoc/formula'

export const editorVar = makeVar<EditorContentProps['editor']>(null)
export const isSavingVar = makeVar(false)

export const pagesVar = makeVar<
  Array<{
    key: string
    value: string
    parentId: string | null | undefined
    sort: number
    icon: string | null
    nextSort: number
    firstChildSort: number
    text: string
    title: string
  }>
>([])
export const FormulaContextVar = makeVar<ContextInterface | null>(null)
