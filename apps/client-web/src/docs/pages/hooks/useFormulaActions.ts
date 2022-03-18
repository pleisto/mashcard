import {
  useFormulaCommitMutation,
  GetFormulasDocument,
  GetFormulasQueryVariables as Variables,
  GetFormulasQuery as Query
} from '@/BrickdocGraphQL'
import { BackendActions, BaseFunctionClause, FunctionContext, StringResult } from '@brickdoc/formula'
import { useImperativeQuery } from '@/common/hooks'
import { DocMeta } from '../DocumentContentPage'

interface useFormulaActionsResult {
  commitFormula: BackendActions['commit']
  queryFormulas: (
    domain: string,
    ids?: string | undefined
  ) => Promise<{
    success: boolean
    data: Query['formulas']
  }>
  generateFormulaFunctionClauses: (docMeta: DocMeta) => Array<BaseFunctionClause<any>>
}

export function useFormulaActions(): useFormulaActionsResult {
  const [commitFormula] = useFormulaCommitMutation()
  const query = useImperativeQuery<Query, Variables>(GetFormulasDocument)

  return {
    commitFormula: async (commitFormulas, deleteFormulas) => {
      const { errors } = await commitFormula({ variables: { input: { commitFormulas, deleteFormulas } } })

      return {
        success: !errors || errors.length === 0
      }
    },

    queryFormulas: async (domain: string, ids?: string) => {
      const { data, error } = await query(ids ? { domain, ids } : { domain })
      return { success: !error, data: data.formulas }
    },

    generateFormulaFunctionClauses: docMeta => {
      return [
        {
          name: 'User',
          async: false,
          pure: false,
          lazy: false,
          acceptError: false,
          effect: false,
          persist: false,
          examples: [{ input: '=User()', output: { type: 'string', result: 'admin' } }],
          description: 'Returns the current user',
          group: 'core',
          args: [],
          testCases: [],
          returns: 'string',
          chain: false,
          reference: (ctx: FunctionContext): StringResult => ({ result: docMeta.personalDomain, type: 'string' })
        }
      ]
    }
  }
}
