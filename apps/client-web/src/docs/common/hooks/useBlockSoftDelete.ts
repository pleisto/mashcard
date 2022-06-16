import { useBlockSoftDeleteMutation } from '@/BrickdocGraphQL'
import { PrependParameter } from '@brickdoc/active-support'
import { dispatchFormulaBlockSoftDelete } from '@brickdoc/formula'

export const useBlockSoftDelete: PrependParameter<
  { id: string; username: string },
  typeof useBlockSoftDeleteMutation
> = (args, options) => {
  return useBlockSoftDeleteMutation({
    ...options,
    onCompleted: async () => {
      await dispatchFormulaBlockSoftDelete(args)
    }
  })
}
