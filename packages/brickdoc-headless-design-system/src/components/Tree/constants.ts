import { ReactNode } from 'react'

export interface TItem {
  key: string
  value: string
  parentId?: string
  title: ReactNode | string
  icon: string | null
  hasItemIcon?: boolean
  hasChildren: boolean
  indent: number | 16 | '1rem'
  isOpen: boolean
  sort: number
  lastPlaceholder: ReactNode | string
}

export type TNode = Pick<TItem, 'key' | 'value' | 'hasItemIcon' | 'sort' | 'isOpen'> & {
  children: TNode[]
}
