import { isEqual } from '@mashcard/active-support'
import { FC, useRef, useMemo, useContext, ReactNode } from 'react'
import { DocMeta, DocMetaContext } from './types'

const emptyDocMeta: DocMeta = {
  id: undefined,
  domain: '',
  isAlias: false,
  alias: undefined,
  isAnonymous: false,
  isMine: false,
  isRedirect: false,
  title: '',
  path: '',
  shareable: false,
  editable: false,
  viewable: false
}

interface Props {
  docMeta: Partial<DocMeta>
  inherit?: boolean
  children?: ReactNode
}

export const DocMetaProvider: FC<Props> = ({ docMeta, inherit, children }) => {
  const ancestor = useContext(DocMetaContext)
  const defaultMeta = inherit && ancestor !== undefined ? ancestor : emptyDocMeta
  const cached = useRef(defaultMeta)
  const value = useMemo(() => {
    const finalDocMeta: DocMeta = { ...defaultMeta, ...docMeta }
    if (!isEqual(cached.current, finalDocMeta)) {
      cached.current = finalDocMeta
    }
    return cached.current
  }, [docMeta, defaultMeta])
  return <DocMetaContext.Provider value={value}>{children}</DocMetaContext.Provider>
}
