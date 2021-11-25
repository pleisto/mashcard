import { parse, interpret, Database, Column } from '../..'
import { FormulaContext } from '../../context'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const databaseNamespaceId = '28e28190-63bd-4f70-aeca-26e72574c01a'

const firstColumnId = '62d9a9ee-88a1-46c7-a929-4a0d9dc0a4d6'
const secondColumnId = '4e6f9adb-6f33-454e-9f9e-635dc98e3f28'
const firstRowId = 'ec4fdfe8-4a12-4a76-aeae-2dea0229e734'
const secondRowId = '5d1e4a83-383a-4991-a33c-52a9b3169549'
const thirdRowId = '05f5ae67-b982-406e-a92f-e559c10a7ba6'

const meta = { namespaceId, variableId, name: 'example' }

const tableData = [
  { id: firstRowId, [firstColumnId]: '1', [secondColumnId]: '2', sort: 100 },
  { id: secondRowId, [firstColumnId]: '3', [secondColumnId]: '4', sort: 100 },
  { id: thirdRowId, [firstColumnId]: '5', [secondColumnId]: '6', sort: 100 }
]
const columns: Column[] = [
  { namespaceId: databaseNamespaceId, columnId: firstColumnId, type: 'foo', name: 'first', index: 0 },
  { namespaceId: databaseNamespaceId, columnId: secondColumnId, type: 'foo', name: 'second', index: 1 }
]

const functionClauses = []

const database: Database = {
  name: () => 'MyTable',
  size: () => tableData.length,
  _data: () => ({}),
  listColumns: () => columns,
  getCell: (columnId, rowId) => {
    const value = tableData.find(row => row.id === rowId)?.[columnId]

    if (value) {
      return { value }
    }

    return undefined
  },
  listCell: columnId => tableData.map(row => ({ value: row[columnId] })),
  getColumn: columnId => columns.find(col => col.columnId === columnId)
}

describe('Database Functions', () => {
  const formulaContext = new FormulaContext({ functionClauses })
  formulaContext.setDatabase(databaseNamespaceId, database)
  const parseInput = { formulaContext, meta }

  it('column', async () => {
    const newMeta = { ...meta, input: `=$${databaseNamespaceId}#${firstColumnId}` }
    const { cst, errorMessages } = parse({ ...parseInput, meta: newMeta, formulaContext })
    expect(errorMessages).toEqual([])
    expect(cst).toMatchSnapshot()
    expect((await interpret({ cst, meta: newMeta, formulaContext })).result.value).toEqual(columns[0])
  })

  it('size', async () => {
    const newMeta = { ...meta, input: `=$${databaseNamespaceId}.database::SIZE()` }
    const { errorMessages, cst } = parse({ ...parseInput, meta: newMeta, formulaContext })
    expect(errorMessages).toEqual([])
    expect(cst).toMatchSnapshot()
    expect((await interpret({ cst, meta: newMeta, formulaContext })).result.value).toEqual(3)
  })

  it('sum', async () => {
    const newMeta = { ...meta, input: `=$${databaseNamespaceId}#${firstColumnId}.database::SUM()` }
    const { errorMessages, cst } = parse({ ...parseInput, meta: newMeta, formulaContext })
    expect(errorMessages).toEqual([])
    expect(cst).toMatchSnapshot()
    expect((await interpret({ cst, meta: newMeta, formulaContext })).result.value).toEqual(1 + 3 + 5)
  })
})
