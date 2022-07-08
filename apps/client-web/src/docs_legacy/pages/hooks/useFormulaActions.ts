import {
  useFormulaCommitMutation,
  GetFormulasDocument,
  GetFormulasQueryVariables as Variables,
  GetFormulasQuery as Query
} from '@/MashcardGraphQL'
import { AnyFunctionClause, BackendActions, createFunctionClause } from '@mashcard/formula'
import { useImperativeQuery } from '@/common/hooks'

interface useFormulaActionsResult {
  commitFormula: BackendActions['commit']
  queryFormulas: (
    domain: string,
    ids?: string | undefined
  ) => Promise<{
    success: boolean
    data: Query['formulas']
  }>
  generateFormulaFunctionClauses: () => AnyFunctionClause[]
}

export function useFormulaActions(): useFormulaActionsResult {
  const [commitFormula] = useFormulaCommitMutation()
  const query = useImperativeQuery<Query, Variables>(GetFormulasDocument)

  return {
    commitFormula: async (commitFormulas, deleteFormulas) => {
      try {
        const { errors } = await commitFormula({ variables: { input: { commitFormulas, deleteFormulas } } })
        return {
          success: !errors || errors.length === 0
        }
      } catch (e) {
        console.log('commit error', e)
        return { success: false }
      }
    },

    queryFormulas: async (domain: string, ids?: string) => {
      const { data, error } = await query(ids ? { domain, ids } : { domain })
      return { success: !error, data: data.formulas }
    },

    generateFormulaFunctionClauses: () => {
      return [
        createFunctionClause({
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
          reference: ctx => ({ result: globalThis.mashcardContext?.currentUser?.name ?? '', type: 'string' })
        })
      ]
    }
  }
}
