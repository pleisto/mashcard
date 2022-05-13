import {
  FunctionContext,
  BaseFunctionClause,
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
  SpreadsheetInitializer,
  SpreadsheetClass,
  Column,
  Cell
} from '../controls'
import { FORMULA_FEATURE_CONTROL } from '../context'
import { uuid } from '@brickdoc/active-support'
import { columnDisplayIndex } from '../grammar'

export const Spreadsheet = (
  ctx: FunctionContext,
  { result, subType }: ArrayResult
): SpreadsheetResult | ErrorResult => {
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

  if (!['void', 'Record'].includes(subType)) {
    return { type: 'Error', result: `Spreadsheet type unmatched: ${subType}`, errorKind: 'runtime' }
  }

  const spreadsheetId = uuid()
  const defaultName = 'Dynamic Spreadsheet'
  const columns: Column[] = []
  const rows: Row[] = []
  const cells: Cell[] = []

  if (recordData.length) {
    const data = recordData.map(e => e.result)
    const keys = Object.keys(data[0])
    const keyWithIds = keys.map(key => ({ key, uuid: uuid() }))

    keys.forEach((key, index) => {
      const column: Column = {
        spreadsheetId,
        columnId: keyWithIds.find(k => k.key === key)!.uuid,
        name: key,
        sort: index,
        title: key,
        displayIndex: columnDisplayIndex(index),
        index
      }

      columns.push(column)
    })

    data.forEach((row, rowIndex) => {
      const rowId = uuid()
      rows.push({ rowId, rowIndex, spreadsheetId })

      columns.forEach(({ name, columnId }, columnIndex) => {
        const cell: Cell = {
          namespaceId: ctx.meta.namespaceId,
          spreadsheetId,
          columnId,
          rowId,
          rowIndex,
          columnIndex,
          cellId: uuid(),
          value: String(row[name]?.result ?? ''),
          displayData: undefined
        }
        cells.push(cell)
      })
    })
  }

  // devLog({ recordData, rows, columns })

  const spreadsheetDefinition: SpreadsheetInitializer = {
    ctx,
    spreadsheetId,
    namespaceId: ctx.meta.namespaceId,
    dynamic: true,
    name: defaultName,
    columns,
    rows,
    getCell: ({ rowId, columnId }) => {
      return cells.find(cell => cell.rowId === rowId && cell.columnId === columnId)!
    }
  }

  const spreadsheet = new SpreadsheetClass(spreadsheetDefinition)
  return { type: 'Spreadsheet', result: spreadsheet }
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

export const CORE_CONTROL_CLAUSES: Array<BaseFunctionClause<'Spreadsheet' | 'Button' | 'Select' | 'Switch' | 'Input'>> =
  [
    {
      name: 'Spreadsheet',
      async: false,
      pure: true,
      persist: false,
      lazy: false,
      acceptError: false,
      effect: false,
      examples: [{ input: '=123', output: null }],
      description: 'Returns the spreadsheet.',
      group: 'core',
      args: [{ name: 'array', type: 'Array' }],
      returns: 'Spreadsheet',
      testCases: [],
      chain: true,
      reference: Spreadsheet
    },
    {
      name: 'Button',
      async: false,
      pure: true,
      persist: false,
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
      pure: true,
      lazy: false,
      persist: false,
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
      pure: true,
      persist: false,
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
      pure: true,
      persist: false,
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
