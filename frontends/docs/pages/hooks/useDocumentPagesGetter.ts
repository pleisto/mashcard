import React from 'react'
import { pagesVar } from '@/docs/reactiveVars'
import { useReactiveVar } from '@apollo/client'
import { DocMeta } from '../DocumentContentPage'

export function useDocumentPagesGetter(docMeta: DocMeta) {
  const data = useReactiveVar(pagesVar)
  const pages = React.useRef(data)
  const webid = React.useRef(docMeta.webid)
  React.useEffect(() => {
    pages.current = data
    webid.current = docMeta.webid
  }, [data, docMeta.webid, docMeta.id])

  return [
    () => ({
      pages: pages.current,
      webid: webid.current
    })
  ]
}
