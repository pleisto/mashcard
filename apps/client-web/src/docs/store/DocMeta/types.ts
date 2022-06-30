import { GetBlockInfoQuery, DocumentInfo } from '@/MashcardGraphQL'
import { createContext } from 'react'

type Collaborator = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['collaborators'][0]
export type Path = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['pathArray'][0]
type Icon = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['icon']

export interface DocMeta {
  id: string | undefined
  domain: string
  isAlias: boolean
  alias: string | undefined
  isAnonymous: boolean
  isDeleted: boolean
  isMine: boolean
  isRedirect: boolean
  isNotExist?: boolean
  pin: boolean
  title: string
  icon?: Icon
  path: string
  collaborators: Collaborator[]
  pathArray: Path[]
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
