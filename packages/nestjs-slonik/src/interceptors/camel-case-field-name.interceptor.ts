import { camelCase } from '@brickdoc/active-support'
import type { Field, Interceptor, QueryResultRow } from 'slonik'

const underscoreFieldRegex = /^[a-z0-9_]+$/u

const fieldTest = (field: Field): boolean => {
  return underscoreFieldRegex.test(field.name)
}

export const camelCaseFieldNameInterceptor = (): Interceptor => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transformRow: (context: any, query, row, fields) => {
      if (!context.sandbox.formattedFields) {
        context.sandbox.formattedFields = []

        for (const field of fields) {
          context.sandbox.formattedFields.push({
            formatted: fieldTest(field) ? camelCase(field.name) : field.name,
            original: field.name
          })
        }
      }

      const { formattedFields } = context.sandbox

      const transformedRow: QueryResultRow = {}

      for (const field of formattedFields) {
        transformedRow[field.formatted] = row[field.original]
      }

      return transformedRow
    }
  }
}
