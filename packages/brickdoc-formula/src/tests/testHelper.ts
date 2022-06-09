import { generateVariable, interpret, parse } from '../grammar/core'
import { FormulaContext, FormulaContextArgs } from '../context'
import { dispatchFormulaBlockNameChangeOrDelete } from '../events'
import { ContextInterface, FunctionContext, InterpretContext } from '../types'
import { Cell, Column, Row, SpreadsheetClass, SpreadsheetType } from '../controls'
import { columnDisplayIndex } from '../grammar'
import {
  BaseTestCase,
  CellInput,
  ColumnInput,
  DEFAULT_UUID_FUNCTION,
  InsertOptions,
  MakeContextOptions,
  MakeContextResult,
  MockedUUIDV4,
  RowInput,
  SpreadsheetInput,
  UUIDState
} from './testType'
import { uuid } from '@brickdoc/active-support'

const quickInsert = async (
  ctx: FunctionContext,
  { ignoreParseError, ignoreSyntaxError }: InsertOptions
): Promise<void> => {
  const parseResult = parse(ctx)
  if (!parseResult.success && !ignoreParseError) {
    throw new Error(parseResult.errorMessages[0]!.message)
  }

  const tempT = await interpret({ parseResult, ctx })
  const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })

  const result = await variable.t.task.variableValue
  if (!ignoreSyntaxError) {
    if (result.result.type === 'Error' && !['runtime'].includes(result.result.errorKind)) {
      throw new Error(result.result.result)
    }
  }
  await variable.save()
}

const fetchUUIDSymbol = (uuid: MockedUUIDV4 | undefined, state: UUIDState): string | undefined => {
  if (typeof uuid === 'symbol') {
    if (state.cache[uuid]) {
      return state.cache[uuid]
    }

    throw new Error(`${String(uuid)} is not defined`)
  }

  return uuid
}

const getUuid = (uuid: MockedUUIDV4 | undefined, state: UUIDState): [string, UUIDState] => {
  if (typeof uuid === 'symbol') {
    if (state.cache[uuid]) {
      return [state.cache[uuid], state]
    } else {
      const newUUID = state.uuidFunction(state.counter)
      state.cache[uuid] = newUUID
      return [newUUID, { ...state, counter: state.counter + 1 }]
    }
  }
  if (typeof uuid === 'string') {
    return [uuid, state]
  }
  return [state.uuidFunction(state.counter), { ...state, counter: state.counter + 1 }]
}

const buildSpreadsheet = (
  oldState: UUIDState,
  namespaceId: string,
  formulaContext: ContextInterface,
  { spreadsheetId: oldSpreadsheetId, name, rows, columns }: SpreadsheetInput<number, number>
): [SpreadsheetType, UUIDState] => {
  let uuidState = oldState
  const [spreadsheetId, state] = getUuid(oldSpreadsheetId, uuidState)
  uuidState = state
  if (columns.length === 0) {
    return [
      new SpreadsheetClass({
        name,
        ctx: { formulaContext },
        dynamic: false,
        spreadsheetId,
        namespaceId,
        columns: [],
        rows: [],
        getCell: ({ rowId, columnId }) => null!
      }),
      uuidState
    ]
  }
  const rowSize = ([...columns][0] as ColumnInput<number>).cells.length
  const columnResult: Column[] = columns.map(({ columnId, name, displayIndex }: ColumnInput<number>, index: number) => {
    const [newColumnId, state] = getUuid(columnId, uuidState)
    uuidState = state
    return {
      spreadsheetId,
      columnId: newColumnId,
      name,
      title: name,
      displayIndex: displayIndex ?? columnDisplayIndex(index),
      index,
      sort: index
    }
  })

  if (rowSize === 0) {
    return [
      new SpreadsheetClass({
        name,
        ctx: { formulaContext },
        dynamic: false,
        spreadsheetId,
        namespaceId,
        columns: columnResult,
        rows: [],
        getCell: ({ rowId, columnId }) => null!
      }),
      uuidState
    ]
  }

  const rowResult: Row[] = (rows ?? [...Array(rowSize)].map((): RowInput => ({}))).map(
    ({ rowId }: RowInput, index: number) => {
      const [newRowId, state] = getUuid(rowId, uuidState)
      uuidState = state
      return { spreadsheetId, rowId: newRowId, rowIndex: index }
    }
  )

  const cells: Cell[] = columns.flatMap(({ cells }: ColumnInput<number>, columnIndex: number) => {
    return cells.map((cell: CellInput, rowIndex: number) => {
      const [cellId, state] = getUuid(cell.cellId, uuidState)
      uuidState = state
      return {
        namespaceId,
        rowId: rowResult[rowIndex].rowId,
        spreadsheetId,
        rowIndex,
        columnIndex,
        columnId: columnResult[columnIndex].columnId,
        value: cell.value,
        displayData: undefined,
        cellId
      }
    })
  })

  return [
    new SpreadsheetClass({
      name,
      ctx: { formulaContext },
      dynamic: false,
      spreadsheetId,
      namespaceId,
      columns: columnResult,
      rows: rowResult,
      getCell: ({ rowId, columnId }) => cells.find(cell => cell.rowId === rowId && cell.columnId === columnId)!
    }),
    uuidState
  ]
}

const defaultInitializeOptions: FormulaContextArgs = { domain: 'test' }

export const makeContext = async (options: MakeContextOptions): Promise<MakeContextResult> => {
  let uuidState: UUIDState = { uuidFunction: options.uuidFunction ?? DEFAULT_UUID_FUNCTION, counter: 0, cache: {} }
  const formulaContext = new FormulaContext(options.initializeOptions ?? defaultInitializeOptions)
  const interpretContext: InterpretContext = {
    ctx: { bar: { type: 'string', result: 'bar123' } },
    arguments: [{ type: 'string', result: 'Foo1234123' }]
  }

  let firstNamespaceId: string | undefined
  const checkVariables: Array<{ namespaceId: string; variableId: string; name: string; result: any }> = []
  for (const { pageId, pageName, variables, spreadsheets } of [...options.pages]) {
    const [namespaceId, state] = getUuid(pageId, uuidState)
    uuidState = state
    if (!firstNamespaceId) firstNamespaceId = namespaceId
    await dispatchFormulaBlockNameChangeOrDelete({ id: namespaceId, name: pageName, deleted: false })

    for (const { variableName, result, variableId, definition, position, insertOptions } of variables ?? []) {
      const [finalVariableId, state] = getUuid(variableId, uuidState)
      uuidState = state
      await quickInsert(
        {
          formulaContext,
          interpretContext,
          meta: {
            namespaceId,
            name: variableName,
            variableId: finalVariableId,
            input: definition,
            position: position ?? 0,
            richType: { type: 'normal' }
          }
        },
        insertOptions ?? {}
      )
      if (result !== undefined) {
        checkVariables.push({ namespaceId, variableId: finalVariableId, name: variableName, result })
      }
    }

    for (const spreadsheetInput of spreadsheets ?? []) {
      const [spreadsheet, state] = buildSpreadsheet(uuidState, namespaceId, formulaContext, spreadsheetInput)
      uuidState = state
      await formulaContext.setSpreadsheet(spreadsheet)
    }
  }

  for (const { namespaceId, variableId, name, result } of checkVariables) {
    const v = formulaContext.findVariableById(namespaceId, variableId)!
    if (!v) throw new Error(`variable ${name} not found`)
    const value = (await v!.t.task.variableValue).result.result
    if (value !== result) throw new Error(`variable ${name} value mismatch: "${value}" !== "${result}"`)
    const v2 = formulaContext.findVariableByName(namespaceId, name)
    if (!v2) throw new Error(`variable ${name} not found`)
    if (v2.t.meta.variableId !== v.t.meta.variableId) throw new Error(`variable ${name} id mismatch`)
  }

  const meta: MakeContextResult['buildMeta'] = args => {
    return {
      variableId: fetchUUIDSymbol(args.variableId, uuidState) ?? uuid(),
      input: args.definition!,
      namespaceId: fetchUUIDSymbol(args.namespaceId, uuidState) ?? firstNamespaceId ?? uuid(),
      name: args.name ?? 'testInput',
      position: args.position ?? 0,
      richType: args.richType ?? { type: 'normal' }
    }
  }

  const fetchUUID: MakeContextResult['fetchUUID'] = uuid => {
    return fetchUUIDSymbol(uuid, uuidState)!
  }

  return { formulaContext, interpretContext, buildMeta: meta, fetchUUID }
}

export const trackTodo = (it: jest.It, testCases: Array<BaseTestCase<{}>>): void => {
  testCases
    .filter(t => t.todo)
    .forEach(t => {
      it.todo(`${t.jestTitle} -> ${t.todo!}`)
    })
}
