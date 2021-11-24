import React from 'react'
import { GetFormulasDocument, GetFormulasQueryVariables as Variables, GetFormulasQuery as Query } from '@/BrickdocGraphQL'
import { DocMeta } from '../DocumentContentPage'
import { useImperativeQuery } from '@/common/hooks'

export function useFormulaQuery(docMeta: DocMeta) {
  const blockId = React.useRef(docMeta.id)
  const query = useImperativeQuery<Query, Variables>(GetFormulasDocument)

  React.useEffect(() => {
    blockId.current = docMeta.id
  }, [docMeta.id])

  return {
    list: async (webid: string) => {
      const { data, error } = await query({ webid })
      return {
        success: !error,
        data: data.formulas
      }
    }
  }
}
