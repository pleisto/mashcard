import { FormulaArrayType } from './array'
import { FormulaBlankType } from './blank'
import { FormulaBlockType } from './block'
import { FormulaBooleanType } from './boolean'
import { FormulaButtonType } from './button'
import { FormulaCellType } from './cell'
import { FormulaColumnType } from './column'
import { FormulaCstType } from './cst'
import { FormulaDateType } from './date'
import { FormulaErrorType } from './error'
import { FormulaFunctionType } from './function'
import { FormulaLiteralType } from './literal'
import { FormulaNoPersistType } from './noPersist'
import { FormulaNullType } from './null'
import { FormulaNumberType } from './number'
import { FormulaPendingType } from './pending'
import { FormulaPredicateType } from './predicate'
import { FormulaRangeType } from './range'
import { FormulaRecordType } from './record'
import { FormulaReferenceType } from './reference'
import { FormulaRowType } from './row'
import { FormulaSpreadsheetType } from './spreadsheet'
import { FormulaStringType } from './string'
import { FormulaSwitchType } from './switch'
import { FormulaWaitingType } from './waiting'

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
