import { TypePolicies, TypePolicy } from '@apollo/client'
import { currentPodWebid } from './brickdocContext'

export const typePolicies: TypePolicies = {
  ...[
    'BlockMeta',
    'BlockAttachment',
    'BlockColor',
    'BlockCover',
    'BlockIcon',
    'BlockImage',
    'BlockLink',
    'blob',
    'BlockBaseObjectPermissions',
    'BlockEmoji'
  ].reduce<Record<string, TypePolicy>>((p, typename) => {
    p[typename] = {
      merge: true
    }
    return p
  }, {}),
  Query: {
    fields: {
      currentPodWebid,
      childrenBlocks: {
        merge(existing, incoming) {
          return [...incoming]
        }
      }
    }
  }
}
