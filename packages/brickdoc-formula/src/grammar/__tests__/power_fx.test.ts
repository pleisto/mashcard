import { parse, innerInterpret } from '../core'
import { FormulaContext } from '../../context'
import { Row, ColumnInitializer, SpreadsheetType, SpreadsheetClass, CellType } from '../../controls'
import { VariableMetadata } from '../../types'
import { BlockNameLoad, BrickdocEventBus } from '@brickdoc/schema'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const spreadsheetId = '28e28190-63bd-4f70-aeca-26e72574c01a'

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

const formulaContext = new FormulaContext({ domain: 'test' })

const spreadsheet: SpreadsheetType = new SpreadsheetClass({
  name: 'MySpreadsheet',
  dynamic: false,
  ctx: { formulaContext },
  namespaceId,
  spreadsheetId,
  columns,
  rows,
  getCell: ({ rowId, columnId }) => {
    return cells.find(cell => cell.rowId === rowId && cell.columnId === columnId)!
  }
})

interface TestCase {
  input: string
  label: string
  error: string | undefined
  value: any
}

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const spreadsheetToken = `#${namespaceId}."MySpreadsheet"`

const testCases: TestCase[] = [
  {
    label: 'CountIf ok',
    input: `=CountIf(${spreadsheetToken}, ${spreadsheetToken}."first" >= 3)`,
    error: 'Expected number but got Column',
    value: 2
  },
  {
    label: 'CountIf error1',
    input: `=CountIf(${spreadsheetToken}, >= 3)`,
    error: undefined,
    value: 'Column is missing'
  }
]

describe('Power Fx Functions', () => {
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
        expect(errorMessages[0]!.message).toEqual(error)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(errorMessages).toEqual([])

        const result = (await innerInterpret({ parseResult, ctx: newCtx })).result.result
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
