import {
  FunctionContext,
  BasicFunctionClause,
  ErrorResult,
  ButtonResult,
  StringResult,
  FunctionResult,
  SwitchResult,
  BooleanResult,
  ArrayResult,
  SelectResult,
  InputResult,
  RecordResult,
  SpreadsheetResult
} from '../types'
import {
  Row,
  SelectOption,
  ButtonClass,
  SwitchClass,
  SelectClass,
  InputClass,
  DatabaseInitializer,
  DatabaseClass,
  ColumnInitializer
} from '../controls'
import { FORMULA_FEATURE_CONTROL } from '../context'
import { v4 as uuid } from 'uuid'

export const Table = (ctx: FunctionContext, { result }: ArrayResult): SpreadsheetResult | ErrorResult => {
  const defaultData: RecordResult[] = [
    {
      type: 'Record',
      subType: 'string',
      result: { Column1: { type: 'string', result: '1' }, Column2: { type: 'string', result: '2' } }
    },
    {
      type: 'Record',
      subType: 'string',
      result: { Column1: { type: 'string', result: '3' }, Column2: { type: 'string', result: '4' } }
    }
  ]

  const recordData: RecordResult[] = result.length ? (result as RecordResult[]) : defaultData

  const nonRecordElement = recordData.find(e => e.type !== 'Record')
  if (nonRecordElement) {
    return { type: 'Error', result: 'Table must be an array of records', errorKind: 'runtime' }
  }

  const blockId = uuid()
  const tableName = 'Dynamic'
  const columns: ColumnInitializer[] = []
  const rows: Row[] = []

  if (recordData.length) {
    const data = recordData.map(e => e.result)
    const keys = Object.keys(data[0])
    const keyWithIds = keys.map(key => ({ key, uuid: uuid() }))

    columns.push(
      ...keys.map((key, index) => ({
        namespaceId: blockId,
        columnId: keyWithIds.find(k => k.key === key)!.uuid,
        name: key,
        index,
        spreadsheetName: tableName,
        type: 'text',
        rows: data.map(e => String(e[key].result || ''))
      }))
    )

    rows.push(
      ...data.map(source => {
        const row: Row = { id: uuid() }

        keyWithIds.forEach(({ key, uuid }) => {
          row[uuid] = String(source[key].result || '')
        })

        return row
      })
    )
  }

  // console.log({ recordData, rows, columns })

  const databaseDefinition: DatabaseInitializer = {
    blockId,
    dynamic: true,
    name: () => tableName,
    listColumns: () => columns,
    listRows: () => rows
  }

  const database = new DatabaseClass(databaseDefinition)
  return { type: 'Spreadsheet', result: database }
}

export const Button = (
  ctx: FunctionContext,
  { result: name }: StringResult,
  fn: FunctionResult
): ButtonResult | ErrorResult => {
  const buttonResult = new ButtonClass(ctx, { name, fn })
  return { result: buttonResult, type: 'Button' }
}

export const Switch = (
  ctx: FunctionContext,
  { result: checked }: BooleanResult,
  fn: FunctionResult
): SwitchResult | ErrorResult => {
  const switchResult = new SwitchClass(ctx, { checked, fn })
  return { result: switchResult, type: 'Switch' }
}

export const Input = (ctx: FunctionContext, fn: FunctionResult): InputResult | ErrorResult => {
  const inputResult = new InputClass(ctx, { fn, value: '' })
  return { result: inputResult, type: 'Input' }
}

export const Select = (
  ctx: FunctionContext,
  { result, subType }: ArrayResult,
  fn: FunctionResult
): SelectResult | ErrorResult => {
  if (!['string', 'number', 'void'].includes(subType)) {
    return { type: 'Error', result: 'Select expects an array of strings', errorKind: 'runtime' }
  }

  const options = result.map(v => String(v.result))

  if (options.length === 0) {
    return { type: 'Error', result: 'Select expects non empty options', errorKind: 'runtime' }
  }

  const selectResult = new SelectClass(ctx, {
    value: options[0],
    options: options as [SelectOption, ...SelectOption[]],
    fn
  })
  return { result: selectResult, type: 'Select' }
}

export const CORE_CONTROL_CLAUSES: Array<
  BasicFunctionClause<'Spreadsheet' | 'Button' | 'Select' | 'Switch' | 'Input'>
> = [
  {
    name: 'Table',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: null }],
    description: 'Returns the table.',
    group: 'core',
    args: [{ name: 'array', type: 'Array' }],
    returns: 'Spreadsheet',
    testCases: [],
    chain: true,
    reference: Table
  },
  {
    name: 'Button',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    feature: FORMULA_FEATURE_CONTROL,
    examples: [{ input: '=Button("name")', output: null }],
    description: 'Build button',
    group: 'core',
    args: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'onClick',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Button',
    chain: false,
    reference: Button
  },
  {
    name: 'CInput',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    feature: FORMULA_FEATURE_CONTROL,
    examples: [{ input: '=Input()', output: null }],
    description: 'Build input',
    group: 'core',
    args: [{ name: 'onChange', type: 'Function' }],
    testCases: [],
    returns: 'Input',
    chain: false,
    reference: Input
  },
  {
    name: 'Switch',
    async: false,
    pure: false,
    lazy: false,
    feature: FORMULA_FEATURE_CONTROL,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Switch("name")', output: null }],
    description: 'Build switch',
    group: 'core',
    args: [
      {
        name: 'name',
        type: 'boolean'
      },
      {
        name: 'onChange',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Switch',
    chain: false,
    reference: Switch
  },
  {
    name: 'Select',
    async: false,
    pure: false,
    lazy: false,
    feature: FORMULA_FEATURE_CONTROL,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Select("name")', output: null }],
    description: 'Build select',
    group: 'core',
    args: [
      {
        name: 'options',
        type: 'Array'
      },
      {
        name: 'onChange',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Select',
    chain: false,
    reference: Select
  }
]
