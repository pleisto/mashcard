import { parse, interpret } from '../core'
import { FormulaContext } from '../../context'
import { Row, ColumnInitializer, SpreadsheetType, SpreadsheetClass, Cell } from '../../controls'
import { VariableMetadata } from '../..'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const spreadsheetNamespaceId = '28e28190-63bd-4f70-aeca-26e72574c01a'
const testNamespaceId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const testVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'

const firstColumnId = '62d9a9ee-88a1-46c7-a929-4a0d9dc0a4d6'
const secondColumnId = '4e6f9adb-6f33-454e-9f9e-635dc98e3f28'
const thirdColumnId = '2723b7d9-22ce-4d93-b2ef-7cce1b122d64'
const firstRowId = 'ec4fdfe8-4a12-4a76-aeae-2dea0229e734'
const secondRowId = '5d1e4a83-383a-4991-a33c-52a9b3169549'
const thirdRowId = '05f5ae67-b982-406e-a92f-e559c10a7ba6'

const meta: VariableMetadata = { namespaceId, variableId, name: 'example', input: '=!!!', position: 0, type: 'normal' }

const rows: Row[] = [{ rowId: firstRowId }, { rowId: secondRowId }, { rowId: thirdRowId }]
const columns: ColumnInitializer[] = [
  {
    columnId: firstColumnId,
    namespaceId: spreadsheetNamespaceId,
    name: 'first',
    index: 0
  },
  {
    columnId: secondColumnId,
    namespaceId: spreadsheetNamespaceId,
    name: 'second',
    index: 1
  },
  {
    columnId: thirdColumnId,
    namespaceId: spreadsheetNamespaceId,
    name: 'third',
    index: 2
  }
]

const cells: Cell[] = [
  { rowId: firstRowId, columnId: firstColumnId, value: '1', data: { displayData: { display: '1' } }, cellId: '' },
  { rowId: firstRowId, columnId: secondColumnId, value: '2', data: { displayData: { display: '2' } }, cellId: '' },
  { rowId: firstRowId, columnId: thirdColumnId, value: '3', data: { displayData: { display: '3' } }, cellId: '' },
  { rowId: secondRowId, columnId: firstColumnId, value: '3', data: { displayData: { display: '3' } }, cellId: '' },
  { rowId: secondRowId, columnId: secondColumnId, value: '4', data: { displayData: { display: '4' } }, cellId: '' },
  { rowId: secondRowId, columnId: thirdColumnId, value: '', data: { displayData: { display: '' } }, cellId: '' },
  { rowId: thirdRowId, columnId: firstColumnId, value: '5', data: { displayData: { display: '5' } }, cellId: '' },
  { rowId: thirdRowId, columnId: secondColumnId, value: '6', data: { displayData: { display: '6' } }, cellId: '' },
  { rowId: thirdRowId, columnId: thirdColumnId, value: 'Foo', data: { displayData: { display: 'Foo' } }, cellId: '' }
]

const spreadsheet: SpreadsheetType = new SpreadsheetClass({
  name: 'MySpreadsheet',
  ctx: {
    formulaContext: new FormulaContext({})
  },
  dynamic: false,
  blockId: spreadsheetNamespaceId,
  listColumns: () => columns,
  listRows: () => rows,
  listCells: ({ rowId, columnId }) => {
    let finalCells = cells
    if (rowId) {
      finalCells = finalCells.filter(cell => cell.rowId === rowId)
    }
    if (columnId) {
      finalCells = finalCells.filter(cell => cell.columnId === columnId)
    }
    return finalCells
  }
})

interface TestCase {
  input: string
  label: string
  value: any
}

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const testCases: TestCase[] = [
  {
    label: 'column',
    input: `=#${spreadsheetNamespaceId}."first"`,
    value: { ...columns[0], spreadsheet }
  },
  { label: 'in spreadsheet true', input: `=3 in #${spreadsheetNamespaceId}`, value: true },
  { label: 'toArray', input: `=#${spreadsheetNamespaceId}.toArray()`, value: SNAPSHOT_FLAG },
  { label: 'toRecordArray', input: `=#${spreadsheetNamespaceId}.toRecordArray()`, value: SNAPSHOT_FLAG },
  { label: 'Spreadsheet', input: `=Spreadsheet([]).toArray()`, value: SNAPSHOT_FLAG },
  { label: 'Spreadsheet', input: `=Spreadsheet([1,2,3]).toArray()`, value: SNAPSHOT_FLAG },
  { label: 'Spreadsheet', input: `=Spreadsheet([{a: 1}, {a: 2}]).toArray()`, value: SNAPSHOT_FLAG },
  { label: 'in spreadsheet false', input: `=4 in #${spreadsheetNamespaceId}`, value: false },
  { label: 'in column true', input: `=3 in #${spreadsheetNamespaceId}."second"`, value: false },
  { label: 'in column false', input: `=4 in #${spreadsheetNamespaceId}.second`, value: true },
  { label: 'exactin column true', input: `="foo" in #${spreadsheetNamespaceId}.third`, value: true },
  { label: 'COLUMN_COUNT', input: `=#${spreadsheetNamespaceId}.COLUMN_COUNT()`, value: 3 },
  { label: 'SUM', input: `=#${spreadsheetNamespaceId}.first.SUM()`, value: 1 + 3 + 5 },
  { label: 'MAX', input: `=#${spreadsheetNamespaceId}.first.MAX()`, value: 5 },
  { label: 'COUNTA', input: `=#${spreadsheetNamespaceId}.first.COUNTA()`, value: 3 },
  { label: 'COUNTA', input: `=#${spreadsheetNamespaceId}.third.COUNTA()`, value: 2 },
  {
    label: 'SUMPRODUCT',
    input: `=SUMPRODUCT(#${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second)`,
    value: 1 * 2 + 3 * 4 + 5 * 6
  },
  {
    label: 'SUMIFS >3',
    input: `=SUMIFS(#${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second, >3)`,
    value: 3 + 5
  },
  {
    label: 'SUMIFS 4',
    input: `=SUMIFS(#${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second, 4)`,
    value: 3
  },
  {
    label: 'AVERAGEIFS 4',
    input: `=AVERAGEIFS(#${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second, >3)`,
    value: 4
  },
  {
    label: 'AVERAGEIFS 100',
    input: `=AVERAGEIFS(#${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second, >100)`,
    value: 'No matching values'
  },
  {
    label: 'COUNTIFS >2',
    input: `=COUNTIFS(#${spreadsheetNamespaceId}.first, >2)`,
    value: 2
  },
  {
    label: 'COUNTIFS =1',
    input: `=COUNTIFS(#${spreadsheetNamespaceId}.first, 3)`,
    value: 1
  },
  {
    label: 'VLOOKUP Not found',
    input: `=VLOOKUP("", #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second)`,
    value: 'Not found'
  },
  {
    label: 'VLOOKUP Column check',
    input: `=VLOOKUP("", #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.first)`,
    value: 'Column cannot be the same as the first column'
  },
  {
    label: 'VLOOKUP ok number',
    input: `=VLOOKUP(1, #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second)`,
    value: '2'
  },
  {
    label: 'VLOOKUP Not found 2 range false',
    input: `=VLOOKUP("2", #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second, false)`,
    value: 'Not found'
  },
  {
    label: 'VLOOKUP 2 range default',
    input: `=VLOOKUP("2", #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second)`,
    value: '2'
  },
  {
    label: 'VLOOKUP 2 range true',
    input: `=VLOOKUP("2", #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second, true)`,
    value: '2'
  },
  {
    label: 'VLOOKUP ok number',
    input: `=VLOOKUP(1, #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second, true)`,
    value: '2'
  },
  {
    label: 'VLOOKUP ok number',
    input: `=VLOOKUP(1, #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second, false)`,
    value: '2'
  },
  {
    label: 'VLOOKUP ok string',
    input: `=VLOOKUP("1", #${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.second)`,
    value: '2'
  },
  {
    label: 'XLOOKUP ok string',
    input: `=XLOOKUP("1", #${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second)`,
    value: '2'
  },
  {
    label: 'XLOOKUP ok string',
    input: `=XLOOKUP("123", #${spreadsheetNamespaceId}.first, #${spreadsheetNamespaceId}.second, "100")`,
    value: '100'
  }
]

describe('Spreadsheet Functions', () => {
  const formulaContext = new FormulaContext({})
  formulaContext.setSpreadsheet(spreadsheet)
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }

  testCases.forEach(({ input, label, value }) => {
    it(`[${label}] ${input}`, async () => {
      const newMeta = { ...meta, input }
      const newCtx = { ...ctx, meta: newMeta }
      const { codeFragments, cst, kind, errorMessages } = parse({ ctx: newCtx })
      expect(errorMessages).toEqual([])
      expect(codeFragments).toMatchSnapshot()
      const result = (await interpret({ parseResult: { cst, kind, errorMessages }, ctx: newCtx })).variableValue.result
        .result
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
    expect(completions.filter(c => c.kind === 'column').length).toEqual(3)

    const input1 = `=#${spreadsheetNamespaceId}.first.`
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
