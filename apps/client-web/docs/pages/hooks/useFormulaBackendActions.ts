import { useFormulaCommitMutation, useFormulaDeleteMutation } from '@/BrickdocGraphQL'
import { BackendActions } from '@brickdoc/formula'

export function useFormulaBackendActions(): BackendActions {
  const [commitFormula] = useFormulaCommitMutation()
  const [deleteFormula] = useFormulaDeleteMutation()

  return {
    commit: async formula => {
      const { errors } = await commitFormula({ variables: { input: formula } })

      return {
        success: !errors || errors.length === 0
      }
    },
    delete: async ({ id, blockId }) => {
      const { errors } = await deleteFormula({ variables: { input: { blockId, id } } })

      return {
        success: !errors || errors.length === 0
      }
    }
  }
}
