import { ReactNode } from 'react'

export interface TNode {
  key: string
  value: string
  parentId?: string | null | undefined
  rootId?: string
  title: ReactNode | string
  icon: string | null
  hasItemIcon?: boolean
  hasChildren: boolean
  firstChildSort: string
  indent: number
  isOpen: boolean
  collapsed: boolean
  sort: number
  lastPlaceholder: ReactNode | string
  children: TNode[]
}

export enum Inserted {
  Top,
  Bottom,
  Child
}

export interface MoveNode {
  sourceIndex: number
  sourceId: string
  targetIndex: number
  targetId: string
  position: Inserted
}
