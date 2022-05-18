import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { MaskId } from '../../../common/utils'

/**
 * Name of the directive
 */
export const ID_SLUG_DIRECTIVE_NAME = `idSlug`
/**
 * Convert id to a masked string
 */
export function idSlugDirectiveTransformer(schema: GraphQLSchema, directiveName: string): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const isSlugDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (isSlugDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async (source, args, context, info) => {
          const result = await resolve(source, args, context, info)
          if (typeof result === 'number') return MaskId(result)
          return result
        }
        return fieldConfig
      }
    }
  })
}
