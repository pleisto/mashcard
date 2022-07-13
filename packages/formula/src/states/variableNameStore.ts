import create from 'zustand/vanilla'
import { FormulaType, FORMULA_SHORT_NAMES, NamespaceId } from '../type'
import { mapValues } from 'lodash'

type SpecialDefaultVariableNameType = typeof FORMULA_SHORT_NAMES[number] | 'void' | 'var'

const FormulaTypeCastName: Record<FormulaType, SpecialDefaultVariableNameType> = {
  string: 'str',
  literal: 'literal',
  number: 'num',
  boolean: 'bool',
  Blank: 'blank',
  Cst: 'cst',
  Switch: 'switch',
  Button: 'button',
  Predicate: 'predicate',
  Pending: 'pending',
  Waiting: 'waiting',
  NoPersist: 'noPersist',
  Function: 'function',
  Reference: 'ref',
  null: 'null',
  Record: 'record',
  Array: 'array',
  Date: 'date',
  Error: 'error',
  Spreadsheet: 'spreadsheet',
  Column: 'column',
  Range: 'range',
  Row: 'row',
  Cell: 'cell',
  Block: 'block',
  void: 'void',
  any: 'var'
}

const matchRegex = new RegExp(`(${FORMULA_SHORT_NAMES.join('|')}|var|void)([0-9]+)$`)

const ReverseCastName = Object.entries(FormulaTypeCastName).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
) as Record<SpecialDefaultVariableNameType, FormulaType>

export interface VariableNameStore {
  data: Record<FormulaType, Record<NamespaceId, number>>
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => string
  maybeAddVariableName: (name: string, namespaceId: NamespaceId) => void
}

export const variableNameStore = create<VariableNameStore>()((set, get) => ({
  data: mapValues(FormulaTypeCastName, () => ({})),
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => {
    const oldCounter = get().data[type][namespaceId] || 0
    return `${FormulaTypeCastName[type]}${oldCounter + 1}`
  },
  maybeAddVariableName: (name, namespaceId) => {
    const match = name.match(matchRegex)
    if (!match) return

    const [, defaultName, count] = match
    const realName = ReverseCastName[defaultName as SpecialDefaultVariableNameType]

    set(state => {
      const counters = state.data[realName] ?? {}
      const newCounter = Math.max(counters[namespaceId] || 0, Number(count))

      return { ...state, data: { ...state.data, [realName]: { ...counters, [namespaceId]: newCounter } } }
    })
  }
}))
