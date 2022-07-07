import { AnyTypeResult, BaseResult, FormulaType } from '../type'

export type FormulaRecordType = BaseResult<'Record', { [key: string]: AnyTypeResult }, string, FormulaType>
