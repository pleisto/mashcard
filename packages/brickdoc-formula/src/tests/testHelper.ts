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
  InsertOptions,
  MakeContextOptions,
  MakeContextResult,
  RowInput,
  SpreadsheetInput,
  uuids
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

const buildSpreadsheet = (
  namespaceId: string,
  oldCounter: number,
  formulaContext: ContextInterface,
  { spreadsheetId: oldSpreadsheetId, name, rows, columns }: SpreadsheetInput<number, number>
): [SpreadsheetType, number] => {
  let counter = oldCounter
  const spreadsheetId = oldSpreadsheetId ?? uuids[counter++]
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
      counter
    ]
  }
  const rowSize = ([...columns][0] as ColumnInput<number>).cells.length
  const columnResult: Column[] = columns.map(
    ({ columnId, name, displayIndex }: ColumnInput<number>, index: number) => ({
      spreadsheetId,
      columnId: columnId ?? uuids[counter++],
      name,
      title: name,
      displayIndex: displayIndex ?? columnDisplayIndex(index),
      index,
      sort: index
    })
  )

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
      counter
    ]
  }

  const rowResult: Row[] = (rows ?? [...Array(rowSize)].map((): RowInput => ({}))).map(
    ({ rowId }: RowInput, index: number) => ({
      spreadsheetId,
      rowId: rowId ?? uuids[counter++],
      rowIndex: index
    })
  )

  const cells: Cell[] = columns.flatMap(({ cells }: ColumnInput<number>, columnIndex: number) => {
    return cells.map((cell: CellInput, rowIndex: number) => ({
      namespaceId,
      rowId: rowResult[rowIndex].rowId,
      spreadsheetId,
      rowIndex,
      columnIndex,
      columnId: columnResult[columnIndex].columnId,
      value: cell.value,
      displayData: undefined,
      cellId: cell.cellId ?? uuids[counter++]
    }))
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
    counter
  ]
}

const defaultInitializeOptions: FormulaContextArgs = { domain: 'test' }

export const makeContext = async ({ pages, initializeOptions }: MakeContextOptions): Promise<MakeContextResult> => {
  const formulaContext = new FormulaContext(initializeOptions ?? defaultInitializeOptions)
  const interpretContext: InterpretContext = {
    ctx: { bar: { type: 'string', result: 'bar123' } },
    arguments: [{ type: 'string', result: 'Foo1234123' }]
  }

  let counter = 0
  let firstNamespaceId: string | undefined
  for (const { pageId, pageName, variables, spreadsheets } of [...pages]) {
    const namespaceId = pageId ?? uuids[counter++]
    if (!firstNamespaceId) firstNamespaceId = namespaceId
    dispatchFormulaBlockNameChangeOrDelete({ id: namespaceId, name: pageName, deleted: false })

    for (const { variableName, variableId, definition, position, insertOptions } of variables ?? []) {
      await quickInsert(
        {
          formulaContext,
          interpretContext,
          meta: {
            namespaceId,
            name: variableName,
            variableId: variableId ?? uuids[counter++],
            input: definition,
            position: position ?? 0,
            richType: { type: 'normal' }
          }
        },
        insertOptions ?? {}
      )
    }

    for (const spreadsheetInput of spreadsheets ?? []) {
      const [spreadsheet, newCounter] = buildSpreadsheet(namespaceId, counter, formulaContext, spreadsheetInput)
      counter = newCounter
      formulaContext.setSpreadsheet(spreadsheet)
    }
  }

  const meta: MakeContextResult['buildMeta'] = args => ({
    variableId: args.variableId ?? uuid(),
    input: args.definition!,
    namespaceId: args.namespaceId ?? firstNamespaceId ?? uuid(),
    name: args.name ?? 'testInput',
    position: 0,
    richType: args.richType ?? { type: 'normal' }
  })

  return { formulaContext, interpretContext, buildMeta: meta }
}

export const trackTodo = (it: jest.It, testCases: Array<BaseTestCase<{}>>): void => {
  testCases
    .filter(t => t.todo)
    .forEach(t => {
      it.todo(`${t.jestTitle} -> ${t.todo!}`)
    })
}
