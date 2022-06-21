import { Cell, CellType, Column, ColumnType, Row, RowType, SpreadsheetClass, SpreadsheetType } from '../controls'
import { dispatchFormulaBlockNameChange } from '../events'
import { PersistFormulaType, TypedResult, VariableMetadata } from '../types'
import { FormulaContext } from '../context/context'
import { dumpValue, loadValue } from '../context/persist'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const spreadsheetId = '28e28190-63bd-4f70-aeca-26e72574c01a'

const firstColumnId = '62d9a9ee-88a1-46c7-a929-4a0d9dc0a4d6'
const secondColumnId = '4e6f9adb-6f33-454e-9f9e-635dc98e3f28'
const thirdColumnId = '2723b7d9-22ce-4d93-b2ef-7cce1b122d64'
const firstRowId = 'ec4fdfe8-4a12-4a76-aeae-2dea0229e734'
const secondRowId = '5d1e4a83-383a-4991-a33c-52a9b3169549'
const thirdRowId = '05f5ae67-b982-406e-a92f-e559c10a7ba6'

const rows: Row[] = [
  { rowId: firstRowId, rowIndex: 0, spreadsheetId },
  { rowId: secondRowId, rowIndex: 1, spreadsheetId },
  { rowId: thirdRowId, rowIndex: 2, spreadsheetId }
]
const columns: Column[] = [
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

const cells: Cell[] = [
  {
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
    namespaceId,
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
void dispatchFormulaBlockNameChange({ id: namespaceId, name: 'Page1', username: 'test' })

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

void formulaContext.setSpreadsheet(spreadsheet)

const meta: VariableMetadata = {
  namespaceId,
  variableId,
  name: 'v',
  input: '=!!!',
  position: 0,
  richType: { type: 'normal' }
}

const ctx = {
  formulaContext,
  interpretContext: {
    ctx: {},
    arguments: []
  },
  meta
}

const columnTypes: ColumnType[] = [
  spreadsheet.findColumn({ type: 'name', value: 'first', namespaceId })!,
  spreadsheet.findColumn({ type: 'name', value: 'A', namespaceId })!,
  spreadsheet.findColumn({ type: 'id', value: firstColumnId, namespaceId })!
]

const rowTypes: RowType[] = [
  spreadsheet.findRow({ type: 'id', value: firstRowId, namespaceId })!,
  spreadsheet.findRow({ type: 'name', value: '1', namespaceId })!
]

const cellTypes: CellType[] = [
  ...columnTypes.flatMap(c => [c.newCell(cells[0], '1'), c.newCell(cells[0], firstRowId)]),
  ...rowTypes.flatMap(r => [r.newCell(cells[0], 'first'), r.newCell(cells[0], 'A'), r.newCell(cells[0], firstColumnId)])
]

const testCases: {
  [P in PersistFormulaType]: {
    cases: Array<TypedResult<P>>
    stringifyError?: true
    serializesSameError?: true
  }
} = {
  null: { cases: [{ type: 'null', result: null }] },
  boolean: { cases: [{ type: 'boolean', result: true }] },
  number: { cases: [{ type: 'number', result: 1 }] },
  string: { cases: [{ type: 'string', result: '1' }] },
  literal: { cases: [{ type: 'literal', result: '1' }] },
  NoPersist: { cases: [{ type: 'NoPersist', result: null }] },
  Pending: { cases: [{ type: 'Pending', result: 'Pending' }] },
  Waiting: { cases: [{ type: 'Waiting', result: 'Waiting' }] },
  Date: {
    cases: [
      { type: 'Date', result: new Date() },
      { type: 'Date', result: new Date('') },
      { type: 'Date', result: new Date('foo bar') }
    ]
  },
  Error: { cases: [{ type: 'Error', result: 'bang!', errorKind: 'runtime' }] },
  Array: {
    cases: [
      { type: 'Array', result: [{ type: 'number', result: 1 }], subType: 'number' },
      { type: 'Array', result: [], subType: 'void' }
    ]
  },
  Record: {
    cases: [
      { type: 'Record', result: { foo: { type: 'number', result: 1 } }, subType: 'number' },
      { type: 'Record', result: {}, subType: 'void' }
    ]
  },
  Spreadsheet: { cases: [{ type: 'Spreadsheet', result: spreadsheet }] },
  Column: { cases: columnTypes.map(c => ({ type: 'Column', result: c })) },
  Row: { cases: rowTypes.map(c => ({ type: 'Row', result: c })), serializesSameError: true },
  Cell: { cases: cellTypes.map(c => ({ type: 'Cell', result: c })), stringifyError: true },
  Block: { cases: [{ type: 'Block', result: formulaContext.findBlockById(namespaceId)! }] }
}

describe('persist TODO', () => {
  const input = Object.entries(testCases).flatMap(([k, { cases, serializesSameError, stringifyError }]) => {
    return cases.map((c, index) => ({ index, type: k, serializesSameError, stringifyError, testCase: c }))
  })
  it.each(input)('dump and load: $type $index', async ({ testCase, serializesSameError, stringifyError }) => {
    const dumpedvalue = dumpValue(testCase)
    if (stringifyError) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => {
        JSON.stringify(dumpedvalue)
      }).toThrowError('Converting circular structure to JSON')
    } else {
      JSON.stringify(dumpedvalue)
    }
    const loadedValue = loadValue(ctx, dumpedvalue)
    if (serializesSameError) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(loadedValue).not.toEqual(testCase)
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(loadedValue).toEqual(testCase)
    }
  })
})
