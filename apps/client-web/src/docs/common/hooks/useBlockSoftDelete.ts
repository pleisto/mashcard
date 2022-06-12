import { useBlockSoftDeleteMutation } from '@/BrickdocGraphQL'
import { PrependParameter } from '@brickdoc/active-support'
import { BrickdocEventBus, DocSoftDeleted } from '@brickdoc/schema'

export const useBlockSoftDelete: PrependParameter<string, typeof useBlockSoftDeleteMutation> = (id, options) => {
  return useBlockSoftDeleteMutation({
    ...options,
    onCompleted: () => {
      BrickdocEventBus.dispatch(DocSoftDeleted({ id }))
    }
  })
}
