import { useFormulaCreateMutation, useFormulaDeleteMutation, useFormulaUpdateMutation } from '@/BrickdocGraphQL'
import { BackendActions } from '@brickdoc/formula'

export function useFormulaBackendActions(): BackendActions {
  const [creation] = useFormulaCreateMutation()
  const [update] = useFormulaUpdateMutation()
  const [deletion] = useFormulaDeleteMutation()

  return {
    createVariable: async formula => {
      const { errors } = await creation({ variables: { input: formula } })

      return {
        success: !errors || errors.length === 0
      }
    },
    updateVariable: async formula => {
      const { errors } = await update({ variables: { input: formula } })

      return {
        success: !errors || errors.length === 0
      }
    },
    deleteVariable: async ({ id, blockId }) => {
      const { errors } = await deletion({ variables: { input: { blockId, id } } })

      return {
        success: !errors || errors.length === 0
      }
    }
  }
}
