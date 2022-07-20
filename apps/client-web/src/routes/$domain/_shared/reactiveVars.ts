import { User } from '@/MashcardGraphQL'
import { makeVar } from '@apollo/client'
import { ContextInterface } from '@mashcard/formula'

export interface AwarenessInfoUser extends User {
  color?: string
  operatorId: string
}

export interface AwarenessInfo {
  user: AwarenessInfoUser
}

export const isSavingVar = makeVar(false)
export const awarenessInfosVar = makeVar<AwarenessInfo[]>([])

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
