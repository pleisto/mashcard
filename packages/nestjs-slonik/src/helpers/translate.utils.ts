import { sql, ValueExpression } from 'slonik'

type TranslationResult = ValueExpression | [string, ValueExpression]

/**
 * Translate column and value to slonik compatible value
 * If value is a array, it will be translated to a sql array
 *
 * @param column column name
 * @param value
 * @returns
 */
export function translateValue(column: string, value: any): TranslationResult {
  let currentValue = value

  if (Array.isArray(currentValue)) {
    currentValue = sql.array(currentValue, 'text')
  }

  return [column, currentValue]
}

/**
 * get value from translation result
 * @param translationResult
 * @returns
 */
export function getValueFromResult(translationResult: TranslationResult): ValueExpression {
  if (Array.isArray(translationResult)) return translationResult[1]

  return translationResult
}

/**
 * get column name from translation result
 * @param translationResult
 * @returns
 */
export function getColumnNameFromResult(translationResult: TranslationResult): string | null {
  if (Array.isArray(translationResult)) return (translationResult as [string, ValueExpression])[0]

  return null
}
