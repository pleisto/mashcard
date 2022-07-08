import { FormulaArrayAttributes, FormulaArrayType } from './array'
import { FormulaBlankAttributes, FormulaBlankType } from './blank'
import { FormulaBlockAttributes, FormulaBlockType } from './block'
import { FormulaBooleanAttributes, FormulaBooleanType } from './boolean'
import { FormulaButtonAttributes, FormulaButtonType } from './button'
import { FormulaCellAttributes, FormulaCellType } from './cell'
import { FormulaColumnAttributes, FormulaColumnType } from './column'
import { FormulaCstAttributes, FormulaCstType } from './cst'
import { FormulaDateAttributes, FormulaDateType } from './date'
import { FormulaErrorAttributes, FormulaErrorType } from './error'
import { FormulaFunctionAttributes, FormulaFunctionType } from './function'
import { FormulaLiteralAttributes, FormulaLiteralType } from './literal'
import { FormulaNoPersistAttributes, FormulaNoPersistType } from './noPersist'
import { FormulaNullAttributes, FormulaNullType } from './null'
import { FormulaNumberAttributes, FormulaNumberType } from './number'
import { FormulaPendingAttributes, FormulaPendingType } from './pending'
import { FormulaPredicateAttributes, FormulaPredicateType } from './predicate'
import { FormulaRangeAttributes, FormulaRangeType } from './range'
import { FormulaRecordAttributes, FormulaRecordType } from './record'
import { FormulaReferenceAttributes, FormulaReferenceType } from './reference'
import { FormulaRowAttributes, FormulaRowType } from './row'
import { FormulaSpreadsheetAttributes, FormulaSpreadsheetType } from './spreadsheet'
import { FormulaStringAttributes, FormulaStringType } from './string'
import { FormulaSwitchAttributes, FormulaSwitchType } from './switch'
import { FormulaWaitingAttributes, FormulaWaitingType } from './waiting'

export type FormulaTypes =
  | FormulaNumberType
  | FormulaBooleanType
  | FormulaStringType
  | FormulaBlankType
  | FormulaNullType
  | FormulaErrorType
  | FormulaLiteralType
  | FormulaArrayType
  | FormulaRecordType
  | FormulaDateType
  | FormulaBlockType
  | FormulaSpreadsheetType
  | FormulaRowType
  | FormulaColumnType
  | FormulaCellType
  | FormulaPredicateType
  | FormulaCstType
  | FormulaReferenceType
  | FormulaFunctionType
  | FormulaRangeType
  | FormulaNoPersistType
  | FormulaWaitingType
  | FormulaPendingType
  | FormulaButtonType
  | FormulaSwitchType

export const FormulaAttributes = {
  [FormulaNumberAttributes.type]: FormulaNumberAttributes,
  [FormulaBooleanAttributes.type]: FormulaBooleanAttributes,
  [FormulaStringAttributes.type]: FormulaStringAttributes,
  [FormulaBlankAttributes.type]: FormulaBlankAttributes,
  [FormulaLiteralAttributes.type]: FormulaLiteralAttributes,
  [FormulaNoPersistAttributes.type]: FormulaNoPersistAttributes,
  [FormulaWaitingAttributes.type]: FormulaWaitingAttributes,
  [FormulaNullAttributes.type]: FormulaNullAttributes,
  [FormulaArrayAttributes.type]: FormulaArrayAttributes,
  [FormulaRecordAttributes.type]: FormulaRecordAttributes,
  [FormulaErrorAttributes.type]: FormulaErrorAttributes,
  [FormulaDateAttributes.type]: FormulaDateAttributes,
  [FormulaBlockAttributes.type]: FormulaBlockAttributes,
  [FormulaSpreadsheetAttributes.type]: FormulaSpreadsheetAttributes,
  [FormulaRowAttributes.type]: FormulaRowAttributes,
  [FormulaColumnAttributes.type]: FormulaColumnAttributes,
  [FormulaCellAttributes.type]: FormulaCellAttributes,
  [FormulaCstAttributes.type]: FormulaCstAttributes,
  [FormulaFunctionAttributes.type]: FormulaFunctionAttributes,
  [FormulaButtonAttributes.type]: FormulaButtonAttributes,
  [FormulaSwitchAttributes.type]: FormulaSwitchAttributes,
  [FormulaReferenceAttributes.type]: FormulaReferenceAttributes,
  [FormulaRangeAttributes.type]: FormulaRangeAttributes,
  [FormulaPredicateAttributes.type]: FormulaPredicateAttributes,
  [FormulaPendingAttributes.type]: FormulaPendingAttributes
} as const
