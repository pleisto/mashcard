import { parse, interpret } from '../core'
import { FormulaContext } from '../../context'
import { Row, ColumnInitializer, SpreadsheetType, SpreadsheetClass, Cell } from '../../controls'
import { VariableMetadata } from '../..'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const spreadsheetNamespaceId = '28e28190-63bd-4f70-aeca-26e72574c01a'

const firstColumnId = '62d9a9ee-88a1-46c7-a929-4a0d9dc0a4d6'
const secondColumnId = '4e6f9adb-6f33-454e-9f9e-635dc98e3f28'
const thirdColumnId = '2723b7d9-22ce-4d93-b2ef-7cce1b122d64'
const firstRowId = 'ec4fdfe8-4a12-4a76-aeae-2dea0229e734'
const secondRowId = '5d1e4a83-383a-4991-a33c-52a9b3169549'
const thirdRowId = '05f5ae67-b982-406e-a92f-e559c10a7ba6'

const meta: VariableMetadata = { namespaceId, variableId, name: 'example', input: '=!!!', position: 0, type: 'normal' }

const rows: Row[] = [{ rowId: firstRowId }, { rowId: secondRowId }, { rowId: thirdRowId }]

const cells: Cell[] = [
  { rowId: firstRowId, columnId: firstColumnId, value: '1', data: {}, cellId: '' },
  { rowId: firstRowId, columnId: secondColumnId, value: '2', data: {}, cellId: '' },
  { rowId: firstRowId, columnId: thirdColumnId, value: '3', data: {}, cellId: '' },
  { rowId: secondRowId, columnId: firstColumnId, value: '3', data: {}, cellId: '' },
  { rowId: secondRowId, columnId: secondColumnId, value: '4', data: {}, cellId: '' },
  { rowId: secondRowId, columnId: thirdColumnId, value: '', data: {}, cellId: '' },
  { rowId: thirdRowId, columnId: firstColumnId, value: '5', data: {}, cellId: '' },
  { rowId: thirdRowId, columnId: secondColumnId, value: '6', data: {}, cellId: '' },
  { rowId: thirdRowId, columnId: thirdColumnId, value: 'Foo', data: {}, cellId: '' }
]

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

const spreadsheet: SpreadsheetType = new SpreadsheetClass({
  name: 'MySpreadsheet',
  dynamic: false,
  ctx: { formulaContext: new FormulaContext({}) },
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
  error: string | undefined
  value: any
}

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const testCases: TestCase[] = [
  {
    label: 'CountIf ok',
    input: `=CountIf(#${spreadsheetNamespaceId}, #${spreadsheetNamespaceId}.${firstColumnId} >= 3)`,
    error: 'Expected number but got Column',
    value: 2
  },
  {
    label: 'CountIf error1',
    input: `=CountIf(#${spreadsheetNamespaceId}, >= 3)`,
    error: undefined,
    value: 'Column is missing'
  }
]

describe('Power Fx Functions', () => {
  const formulaContext = new FormulaContext({})
  formulaContext.setSpreadsheet(spreadsheet)
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }

  testCases.forEach(({ input, label, value, error }) => {
    it(`[${label}] ${input}`, async () => {
      const newMeta = { ...meta, input }
      const newCtx = { ...ctx, meta: newMeta }
      const { codeFragments, kind, cst, errorMessages } = parse({ ctx: newCtx })
      expect(codeFragments).toMatchSnapshot()
      if (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(errorMessages[0]!.message).toEqual(error)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(errorMessages).toEqual([])

        const result = (await interpret({ parseResult: { cst, kind, errorMessages }, ctx: newCtx })).variableValue
          .result.result
        if (value === SNAPSHOT_FLAG) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(result).toMatchSnapshot()
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(result).toEqual(value)
        }
      }
    })
  })
})
