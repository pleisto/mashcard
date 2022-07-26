import { generateVariable, interpret, parse } from '../grammar/core'
import { FormulaContext, FormulaContextArgs } from '../context'
import { dispatchFormulaBlockNameChange } from '../events'
import { ContextInterface, FunctionContext, InterpretContext } from '../type'
import { Cell, Column, Row, SpreadsheetClass, SpreadsheetType } from '../controls'
import { columnDisplayIndex, errorMessageToString } from '../grammar'
import {
  CellInput,
  ColumnInput,
  DEFAULT_UUID_FUNCTION,
  DistributeEvents,
  ExtendedCtx,
  InsertOptions,
  MakeContextOptions,
  MakeContextResult,
  MockedUUIDV4,
  RowInput,
  SpreadsheetInput,
  UUIDState
} from './testType'
import { uuid } from '@mashcard/active-support'
import { AllowEvents } from './testEvent'

const quickInsert = async (
  ctx: FunctionContext,
  { ignoreParseError, ignoreSyntaxError }: InsertOptions
): Promise<void> => {
  const parseResult = parse(ctx)
  if (!parseResult.success && !ignoreParseError) {
    throw new Error(errorMessageToString(parseResult.errorMessages[0]!))
  }

  const tempT = await interpret({ parseResult, ctx })
  const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })

  const result = await variable.t.task.variableValue
  if (!ignoreSyntaxError) {
    if (result.result.type === 'Error' && !['runtime'].includes(result.result.result.type)) {
      throw new Error(errorMessageToString(result.result.result))
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

const buildSpreadsheet = async (
  oldState: UUIDState,
  namespaceId: string,
  formulaContext: ContextInterface,
  interpretContext: InterpretContext,
  { spreadsheetId: oldSpreadsheetId, name, rows, columns, getCell }: SpreadsheetInput<number, number>
): // eslint-disable-next-line max-params
Promise<[SpreadsheetType, UUIDState]> => {
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
        getCell: args => getCell?.(args) ?? null!
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
        getCell: args => getCell?.(args) ?? null!
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
      const [variableId, state2] = getUuid(cell.variableId, state)
      uuidState = state2
      return {
        namespaceId,
        rowId: rowResult[rowIndex].rowId,
        spreadsheetId,
        rowIndex,
        columnIndex,
        columnId: columnResult[columnIndex].columnId,
        value: cell.value,
        variableId,
        cellId
      }
    })
  })

  for (const { namespaceId, variableId, value, columnId, rowId, spreadsheetId } of cells) {
    await quickInsert(
      {
        formulaContext,
        interpretContext,
        meta: {
          namespaceId,
          variableId,
          input: value,
          position: 0,
          name: `Cell_${rowId}_${columnId}`.replaceAll('-', ''),
          richType: { type: 'spreadsheet', meta: { rowId, columnId, spreadsheetId } }
        }
      },
      { ignoreParseError: true, ignoreSyntaxError: true }
    )
  }

  return [
    new SpreadsheetClass({
      name,
      ctx: { formulaContext },
      dynamic: false,
      spreadsheetId,
      namespaceId,
      columns: columnResult,
      rows: rowResult,
      getCell: args =>
        cells.find(cell => cell.rowId === args.rowId && cell.columnId === args.columnId) ?? getCell?.(args) ?? null!
    }),
    uuidState
  ]
}

const defaultInitializeOptions: FormulaContextArgs = { username: 'test' }

export const makeContext = async (options: MakeContextOptions): Promise<MakeContextResult> => {
  let uuidState: UUIDState = { uuidFunction: options.uuidFunction ?? DEFAULT_UUID_FUNCTION, counter: 0, cache: {} }
  const formulaContext = new FormulaContext(options.initializeOptions ?? defaultInitializeOptions)
  const interpretContext: InterpretContext = {
    ctx: { bar: { type: 'string', result: 'bar123' } },
    arguments: [{ type: 'string', result: 'Foo1234123' }]
  }

  let firstNamespaceId: string | undefined
  const checkVariables = []
  for (const { pageId, pageName, variables, spreadsheets } of [...options.pages]) {
    const [namespaceId, state] = getUuid(pageId, uuidState)
    uuidState = state
    if (!firstNamespaceId) firstNamespaceId = namespaceId
    await dispatchFormulaBlockNameChange({ id: namespaceId, name: pageName, username: formulaContext.username })

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
        checkVariables.push({ namespaceId, variableId: finalVariableId, pageName, name: variableName, result })
      }
    }

    for (const spreadsheetInput of spreadsheets ?? []) {
      const [spreadsheet, state] = await buildSpreadsheet(
        uuidState,
        namespaceId,
        formulaContext,
        interpretContext,
        spreadsheetInput
      )
      uuidState = state
      await formulaContext.setSpreadsheet(spreadsheet)
    }
  }

  for (const { namespaceId, variableId, name, result, pageName } of checkVariables) {
    const v = formulaContext.findVariableById(namespaceId, variableId)!
    if (!v) throw new Error(`[${pageName}] variable ${name} not found`)
    const value = (await v!.t.task.variableValue).result.result
    if (JSON.stringify(value) !== JSON.stringify(result))
      throw new Error(`[${pageName}] variable ${name} value mismatch: "${value}" !== "${result}"`)
    const v2 = formulaContext.findVariableByName(namespaceId, name)
    if (!v2) throw new Error(`[${pageName}] variable ${name} not found`)
    if (v2.t.meta.variableId !== v.t.meta.variableId) throw new Error(`[${pageName}] variable ${name} id mismatch`)
  }

  const buildMeta: MakeContextResult['buildMeta'] = args => {
    const variableId = fetchUUIDSymbol(args.variableId, uuidState) ?? uuid()
    return {
      variableId,
      input: args.definition!,
      namespaceId: fetchUUIDSymbol(args.namespaceId, uuidState) ?? firstNamespaceId ?? uuid(),
      name: args.name ?? `testInput${variableId}`.replaceAll('-', ''),
      position: args.position ?? 0,
      richType: args.richType ?? { type: 'normal' }
    }
  }

  const fetchUUID: MakeContextResult['fetchUUID'] = uuid => {
    return fetchUUIDSymbol(uuid, uuidState)!
  }

  const parseDirectly: MakeContextResult['parseDirectly'] = args => {
    const meta = buildMeta(args)
    const ctx = { formulaContext, interpretContext, meta }
    return parse(ctx)
  }

  const interpretDirectly: MakeContextResult['interpretDirectly'] = async args => {
    const meta = buildMeta(args)
    const ctx = { formulaContext, interpretContext, meta }
    const parseResult = parse(ctx)
    return [await interpret({ ctx, parseResult }), parseResult]
  }

  return { formulaContext, interpretContext, buildMeta, fetchUUID, interpretDirectly, parseDirectly }
}

export const trackTodo = (it: jest.It, testCases: Array<{ todoMessage?: string; jestTitle: string }>): void => {
  testCases
    .filter(t => t.todoMessage)
    .forEach(t => {
      it.todo(`${t.jestTitle} -> ${t.todoMessage!}`)
    })
}

export const generateUUIDs = (): string[] => [...Array(20)].map(() => uuid())

export const buildEvent = <Args extends DistributeEvents[]>(input: Args): ((ctx: ExtendedCtx) => Promise<void>) => {
  return async ctx => {
    for (const [f, args] of input) {
      await AllowEvents[f](ctx, { ...args, username: ctx.formulaContext.username } as any)
    }
  }
}

export const splitDefinition$ = (definition$: string): [definition: string, position: number] => {
  const splits = definition$.split('$')
  if (splits.length !== 2) throw new Error(`definitionWithCursor error ${definition$}`)

  return [`${splits[0]}${splits[1]}`, splits[0].length]
}
