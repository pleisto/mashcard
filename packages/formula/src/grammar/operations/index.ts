import { OperatorType } from '../operator'
import { accessOperator } from './access'
import { additionOperator } from './addition'
import { argumentsOperator } from './arguments'
import { arrayOperator } from './array'
import { blockOperator } from './block'
import { booleanOperator } from './boolean'
import { chainOperator } from './chain'
import { combineOperator } from './combine'
import { compareOperator } from './compare'
import { concatOperator } from './concat'
import { equalCompareOperator } from './equalCompare'
import { expressionOperator } from './expression'
import { inOperator } from './in'
import { multiplicationOperator } from './multiplication'
import { nameOperator } from './name'
import { notOperator } from './not'
import { nullOperator } from './null'
import { numberOperator } from './number'
import { parenthesisOperator } from './parenthesis'
import { predicateOperator } from './predicate'
import { rangeOperator } from './range'
import { recordOperator } from './record'
import { recordFieldOperator } from './recordField'
import { stringOperator } from './string'
import { thisRecordOperator } from './thisRecord'
import { thisRowOperator } from './thisRow'

export * from './addition'
export * from './concat'
export * from './combine'
export * from './equalCompare'
export * from './multiplication'
export * from './compare'
export * from './expression'
export * from './not'
export * from './range'
export * from './in'
export * from './predicate'
export * from './chain'
export * from './access'
export * from './array'
export * from './parenthesis'
export * from './recordField'
export * from './record'
export * from './arguments'
export * from './block'
export * from './thisRow'
export * from './thisRecord'
export * from './name'
export * from './string'
export * from './null'
export * from './boolean'
export * from './number'

export const OPERATORS: OperatorType[] = [
  accessOperator,
  additionOperator,
  argumentsOperator,
  arrayOperator,
  blockOperator,
  chainOperator,
  combineOperator,
  compareOperator,
  concatOperator,
  equalCompareOperator,
  expressionOperator,
  inOperator,
  multiplicationOperator,
  notOperator,
  parenthesisOperator,
  predicateOperator,
  rangeOperator,
  recordFieldOperator,
  recordOperator,
  thisRecordOperator,
  thisRowOperator,
  nameOperator,
  stringOperator,
  nullOperator,
  booleanOperator,
  numberOperator
]
