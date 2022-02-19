import { TypePolicies, TypePolicy } from '@apollo/client'
import { currentSpaceDomain } from './brickdocContext'

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
      currentSpaceDomain,
      childrenBlocks: {
        merge(existing, incoming) {
          return [...incoming]
        }
      }
    }
  }
}
