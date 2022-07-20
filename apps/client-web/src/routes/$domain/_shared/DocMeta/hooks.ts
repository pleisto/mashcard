import { useContext } from 'react'
import { DocMeta, DocMetaContext, NonNullDocMeta } from './types'

export function useDocMeta(): DocMeta {
  return useContext(DocMetaContext)
}

export function useNonNullDocMeta(): NonNullDocMeta {
  const { id, alias, ...rest } = useDocMeta()
  return {
    id: id ?? '',
    alias: alias ?? '',
    ...rest
  }
}
