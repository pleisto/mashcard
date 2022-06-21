import { useBlockSoftDeleteMutation } from '@/MashcardGraphQL'
import { PrependParameter } from '@mashcard/active-support'
import { dispatchFormulaBlockSoftDelete } from '@mashcard/formula'

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
