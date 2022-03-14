import { useFormulaCommitMutation } from '@/BrickdocGraphQL'
import { BackendActions } from '@brickdoc/formula'

export function useFormulaBackendActions(): BackendActions {
  const [commitFormula] = useFormulaCommitMutation()

  return {
    commit: async (commitFormulas, deleteFormulas) => {
      const { errors } = await commitFormula({ variables: { input: { commitFormulas, deleteFormulas } } })

      return {
        success: !errors || errors.length === 0
      }
    }
  }
}
