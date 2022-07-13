import { DocumentInfo } from '@/MashcardGraphQL'
import { createContext } from 'react'

export interface DocMeta {
  id: string | undefined
  domain: string
  isAlias: boolean
  alias: string | undefined
  isAnonymous: boolean
  // isDeleted: boolean
  isMine: boolean
  isRedirect: boolean
  isNotExist?: boolean
  // pin: boolean
  title: string
  // icon?: Icon
  path: string
  // collaborators: Collaborator[]
  // pathArray: Path[]
  shareable: boolean
  editable: boolean
  viewable: boolean
  historyId?: string
  documentInfo?: DocumentInfo
}

export interface NonNullDocMeta extends DocMeta {
  id: string
  alias: string
}

export const DocMetaContext = createContext<DocMeta>(undefined as any)
