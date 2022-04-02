import { parse, innerInterpret } from '../core'
import { FormulaContext } from '../../context'
import { Row, ColumnInitializer, SpreadsheetType, SpreadsheetClass, CellType } from '../../controls'
import { VariableMetadata } from '../../types'
import { BlockNameLoad, BrickdocEventBus } from '@brickdoc/schema'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const spreadsheetId = '28e28190-63bd-4f70-aeca-26e72574c01a'
const testNamespaceId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const testVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'

const firstColumnId = '62d9a9ee-88a1-46c7-a929-4a0d9dc0a4d6'
const secondColumnId = '4e6f9adb-6f33-454e-9f9e-635dc98e3f28'
const thirdColumnId = '2723b7d9-22ce-4d93-b2ef-7cce1b122d64'
const firstRowId = 'ec4fdfe8-4a12-4a76-aeae-2dea0229e734'
const secondRowId = '5d1e4a83-383a-4991-a33c-52a9b3169549'
const thirdRowId = '05f5ae67-b982-406e-a92f-e559c10a7ba6'

const meta: VariableMetadata = { namespaceId, variableId, name: 'example', input: '=!!!', position: 0, type: 'normal' }

const rows: Row[] = [
  { rowId: firstRowId, rowIndex: 0, spreadsheetId },
  { rowId: secondRowId, rowIndex: 1, spreadsheetId },
  { rowId: thirdRowId, rowIndex: 2, spreadsheetId }
]
const columns: ColumnInitializer[] = [
  {
    columnId: firstColumnId,
    spreadsheetId,
    sort: 0,
    title: 'first',
    displayIndex: 'A',
    name: 'first',
    index: 0
  },
  {
    columnId: secondColumnId,
    spreadsheetId,
    sort: 1,
    title: 'second',
    displayIndex: 'B',
    name: 'second',
    index: 1
  },
  {
    columnId: thirdColumnId,
    spreadsheetId,
    sort: 2,
    title: 'third',
    displayIndex: 'C',
    name: 'third',
    index: 2
  }
]

const cells: CellType[] = [
  {
    rowId: firstRowId,
    spreadsheetId,
    rowIndex: 0,
    columnIndex: 0,
    columnId: firstColumnId,
    value: '1',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: firstRowId,
    spreadsheetId,
    rowIndex: 0,
    columnIndex: 1,
    columnId: secondColumnId,
    value: '2',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: firstRowId,
    spreadsheetId,
    rowIndex: 0,
    columnIndex: 2,
    columnId: thirdColumnId,
    value: '3',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: secondRowId,
    spreadsheetId,
    rowIndex: 1,
    columnIndex: 0,
    columnId: firstColumnId,
    value: '3',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: secondRowId,
    spreadsheetId,
    rowIndex: 1,
    columnIndex: 1,
    columnId: secondColumnId,
    value: '4',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: secondRowId,
    spreadsheetId,
    rowIndex: 1,
    columnIndex: 2,
    columnId: thirdColumnId,
    value: '',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: thirdRowId,
    spreadsheetId,
    rowIndex: 2,
    columnIndex: 0,
    columnId: firstColumnId,
    value: '5',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: thirdRowId,
    spreadsheetId,
    rowIndex: 2,
    columnIndex: 1,
    columnId: secondColumnId,
    value: '6',
    displayData: undefined,
    cellId: ''
  },
  {
    rowId: thirdRowId,
    spreadsheetId,
    rowIndex: 2,
    columnIndex: 2,
    columnId: thirdColumnId,
    value: 'Foo',
    displayData: undefined,
    cellId: ''
  }
]

const formulaContext = new FormulaContext({ domain: 'test' })

const spreadsheet: SpreadsheetType = new SpreadsheetClass({
  name: 'MySpreadsheet',
  ctx: { formulaContext },
  dynamic: false,
  spreadsheetId,
  namespaceId,
  columns,
  rows,
  getCell: ({ rowId, columnId }) => {
    return cells.find(cell => cell.rowId === rowId && cell.columnId === columnId)!
  }
})

const spreadsheetToken = `#${namespaceId}.MySpreadsheet`

interface TestCase {
  input: string
  label: string
  error?: string
  value?: any
}

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const testCases: TestCase[] = [
  {
    label: 'column',
    input: `=${spreadsheetToken}."first"`,
    value: SNAPSHOT_FLAG
  },
  {
    label: 'cell',
    input: `=${spreadsheetToken}."first".1`,
    value: cells[0]
  },
  {
    label: 'cell access',
    input: `=${spreadsheetToken}."first"[1]`,
    value: cells[0]
  },
  {
    label: 'cell error1',
    input: `=${spreadsheetToken}."first".foobar`,
    error: 'Need a number: foobar'
  },
  {
    label: 'cell error2',
    input: `=${spreadsheetToken}."first".100`,
    error: 'Cell out of range: 3'
  },
  {
    label: 'Range 1',
    input: `=${spreadsheetToken}.first.1:${spreadsheetToken}.first.2`,
    value: SNAPSHOT_FLAG
  },
  { label: 'in spreadsheet true', input: `=3 in ${spreadsheetToken}`, value: true },
  { label: 'toArray', input: `=${spreadsheetToken}.toArray()`, value: SNAPSHOT_FLAG },
  { label: 'toRecordArray', input: `=${spreadsheetToken}.toRecordArray()`, value: SNAPSHOT_FLAG },
  { label: 'Spreadsheet', input: `=Spreadsheet([]).toArray()`, value: SNAPSHOT_FLAG },
  { label: 'Spreadsheet', input: `=Spreadsheet([1,2,3]).toArray()`, value: SNAPSHOT_FLAG },
  { label: 'Spreadsheet', input: `=Spreadsheet([{a: 1}, {a: 2}]).toArray()`, value: SNAPSHOT_FLAG },
  { label: 'in spreadsheet false', input: `=4 in ${spreadsheetToken}`, value: false },
  { label: 'in column true', input: `=3 in ${spreadsheetToken}."second"`, value: false },
  { label: 'in column false', input: `=4 in ${spreadsheetToken}.second`, value: true },
  { label: 'exactin column true', input: `="foo" in ${spreadsheetToken}.third`, value: true },
  { label: 'COLUMN_COUNT', input: `=${spreadsheetToken}.COLUMN_COUNT()`, value: 3 },
  { label: 'SUM', input: `=${spreadsheetToken}.first.SUM()`, value: 1 + 3 + 5 },
  { label: 'MAX', input: `=${spreadsheetToken}.first.MAX()`, value: 5 },
  { label: 'COUNTA', input: `=${spreadsheetToken}.first.COUNTA()`, value: 3 },
  { label: 'COUNTA', input: `=${spreadsheetToken}.third.COUNTA()`, value: 2 },
  {
    label: 'SUMPRODUCT',
    input: `=SUMPRODUCT(${spreadsheetToken}.first, ${spreadsheetToken}.second)`,
    value: 1 * 2 + 3 * 4 + 5 * 6
  },
  {
    label: 'SUMIFS >3',
    input: `=SUMIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, >3)`,
    value: 3 + 5
  },
  {
    label: 'SUMIFS 4',
    input: `=SUMIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, 4)`,
    value: 3
  },
  {
    label: 'AVERAGEIFS 4',
    input: `=AVERAGEIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, >3)`,
    value: 4
  },
  {
    label: 'AVERAGEIFS 100',
    input: `=AVERAGEIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, >100)`,
    value: 'No matching values'
  },
  {
    label: 'COUNTIFS >2',
    input: `=COUNTIFS(${spreadsheetToken}.first, >2)`,
    value: 2
  },
  {
    label: 'COUNTIFS =1',
    input: `=COUNTIFS(${spreadsheetToken}.first, 3)`,
    value: 1
  },
  {
    label: 'VLOOKUP Not found',
    input: `=VLOOKUP("", ${spreadsheetToken}, ${spreadsheetToken}.second)`,
    value: 'Not found'
  },
  {
    label: 'VLOOKUP Column check',
    input: `=VLOOKUP("", ${spreadsheetToken}, ${spreadsheetToken}.first)`,
    value: 'Column cannot be the same as the first column'
  },
  {
    label: 'VLOOKUP ok number',
    input: `=VLOOKUP(1, ${spreadsheetToken}, ${spreadsheetToken}.second)`,
    value: '2'
  },
  {
    label: 'VLOOKUP Not found 2 range false',
    input: `=VLOOKUP("2", ${spreadsheetToken}, ${spreadsheetToken}.second, false)`,
    value: 'Not found'
  },
  {
    label: 'VLOOKUP 2 range default',
    input: `=VLOOKUP("2", ${spreadsheetToken}, ${spreadsheetToken}.second)`,
    value: '2'
  },
  {
    label: 'VLOOKUP 2 range true',
    input: `=VLOOKUP("2", ${spreadsheetToken}, ${spreadsheetToken}.second, true)`,
    value: '2'
  },
  {
    label: 'VLOOKUP ok number',
    input: `=VLOOKUP(1, ${spreadsheetToken}, ${spreadsheetToken}.second, true)`,
    value: '2'
  },
  {
    label: 'VLOOKUP ok number',
    input: `=VLOOKUP(1, ${spreadsheetToken}, ${spreadsheetToken}.second, false)`,
    value: '2'
  },
  {
    label: 'VLOOKUP ok string',
    input: `=VLOOKUP("1", ${spreadsheetToken}, ${spreadsheetToken}.second)`,
    value: '2'
  },
  {
    label: 'XLOOKUP ok string',
    input: `=XLOOKUP("1", ${spreadsheetToken}.first, ${spreadsheetToken}.second)`,
    value: '2'
  },
  {
    label: 'XLOOKUP ok string',
    input: `=XLOOKUP("123", ${spreadsheetToken}.first, ${spreadsheetToken}.second, "100")`,
    value: '100'
  }
]

describe('Spreadsheet Functions', () => {
  BrickdocEventBus.dispatch(BlockNameLoad({ id: namespaceId, name: 'Page1' }))
  formulaContext.setSpreadsheet(spreadsheet)
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }

  testCases.forEach(({ input, label, value, error }) => {
    it(`[${label}] ${input}`, async () => {
      const newMeta = { ...meta, input }
      const newCtx = { ...ctx, meta: newMeta }
      const parseResult = parse({ ctx: newCtx })
      const { codeFragments, errorMessages } = parseResult
      expect(codeFragments).toMatchSnapshot()

      if (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(errorMessages[0]?.message).toEqual(error)
        return
      }
      expect(errorMessages).toEqual([])
      const result = (await innerInterpret({ parseResult, ctx: newCtx })).result.result
      if (value === SNAPSHOT_FLAG) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toMatchSnapshot()
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toEqual(value)
      }
    })
  })

  it('Spreadsheet Factory', () => {
    expect(spreadsheet.listColumns()).toMatchSnapshot()
    expect(spreadsheet.listRows()).toMatchSnapshot()
    expect(spreadsheet.toArray()).toMatchSnapshot()
    expect(spreadsheet.toRecord()).toMatchSnapshot()
  })

  it('completion TODO', () => {
    const completions = formulaContext.completions(namespaceId, variableId)
    expect(completions[0].kind).toEqual('spreadsheet')
    expect(completions[0]).toMatchSnapshot()
    expect(completions.filter(c => c.kind === 'column').length).toEqual(0)

    const input1 = `=#${spreadsheetToken}.first.`
    const { completions: input1Completions } = parse({
      ctx: {
        ...ctx,
        meta: {
          namespaceId: testNamespaceId,
          variableId: testVariableId,
          name: 'foo',
          input: input1,
          position: 0,
          type: 'normal'
        }
      },
      position: input1.length
    })
    expect(input1Completions[0]).toMatchSnapshot()
    // expect(input1Completions[0].kind).toEqual('function')

    // const input2 = `=#${spreadsheetNamespaceId}.`
    // const { completions: input2Completions } = parse({
    //   ctx: {
    //     ...ctx,
    //     meta: {
    //       namespaceId: testNamespaceId,
    //       variableId: testVariableId,
    //       name: 'foo',
    //       input: input2,
    //       position: 0,
    //       type: 'normal'
    //     }
    //   },
    //   position: input2.length
    // })
    // expect(input2Completions[0].kind).toEqual('function')
    // expect(input2Completions[0]).toMatchSnapshot()
    // expect(input2Completions.find(c => c.kind === 'function')).toMatchSnapshot()
  })
})
