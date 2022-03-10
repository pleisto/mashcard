import {
  GetFormulasDocument,
  GetFormulasQueryVariables as Variables,
  GetFormulasQuery as Query
} from '@/BrickdocGraphQL'
import { useImperativeQuery } from '@/common/hooks'

export function useFormulaQuery() {
  const query = useImperativeQuery<Query, Variables>(GetFormulasDocument)

  return async (domain: string, ids?: string) => {
    const { data, error } = await query(ids ? { domain, ids } : { domain })
    return { success: !error, data: data.formulas }
  }
}
