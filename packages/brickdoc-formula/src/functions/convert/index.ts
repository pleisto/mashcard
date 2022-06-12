import { convertToArray } from './toArray'
import { convertToBoolean } from './toBoolean'
import { convertToNumber } from './toNumber'
import { convertToRecord } from './toRecord'
import { convertToString } from './toString'

export const CORE_CONVERT_FUNCTION_CLAUSES = [
  convertToArray,
  convertToRecord,
  convertToString,
  convertToNumber,
  convertToBoolean
]
