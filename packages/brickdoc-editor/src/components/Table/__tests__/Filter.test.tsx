import { Table } from '../Table'
import { render, screen, fireEvent } from '@testing-library/react'
import { EditorDataSource, EditorDataSourceContext, useDatabaseRowsReturn } from '../../..'
import { DatabaseRow } from '../../../extensions'

function buildTableSource(editorDataSource: EditorDataSource): void {
  const container: { source?: useDatabaseRowsReturn } = {}
  container.source = {
    rows: [],
    async fetchRows(parentId) {},
    addRow(parentId, rowIndex) {
      const currentRowIndex = rowIndex ?? container.source!.rows.length - 1
      const id = new Date().getTime().toString()
      const row = { id, sort: currentRowIndex }
      container.source! = {
        ...container.source!,
        rows: [
          ...container.source!.rows.slice(0, currentRowIndex + 1),
          row,
          ...container.source!.rows.slice(currentRowIndex + 1, container.source!.rows.length)
        ]
      }
      return row
    },
    async updateRows(parentId, rows) {
      const rowsMap = new Map(rows.map(row => [row.id, row]))
      const prevRowsMap = new Map(container.source!.rows.map(row => [row.id, row]))
      const newRows = [
        ...container.source!.rows.map(prevRow => rowsMap.get(prevRow.id) ?? prevRow),
        ...rows.filter(row => !prevRowsMap.has(row.id))
      ].sort((a, b) => b.sort - a.sort)
      container.source! = {
        ...container.source!,
        rows: newRows
      }
    },
    removeRow(rowId) {
      container.source! = {
        ...container.source!,
        rows: container.source!.rows.filter(row => row.id !== rowId)
      }
    },
    moveRow(parentId, fromIndex, toIndex) {
      let targetRow: DatabaseRow | undefined
      const newRows = container.source!.rows.filter((row, index) => {
        if (index !== fromIndex) {
          return true
        } else {
          targetRow = row
          return false
        }
      })
      if (!targetRow) return

      container.source! = {
        ...container.source!,
        rows: [...newRows.slice(0, toIndex), targetRow, ...newRows.slice(toIndex, newRows.length)]
      }

      return targetRow
    }
  }

  editorDataSource.useDatabaseRows = opt => container.source!
}
// see more tests in e2e testing
describe('Table Filter', () => {
  const editorDataSource = new EditorDataSource()

  const props: any = {
    editor: {},
    node: {
      attrs: {
        data: {
          columns: [
            {
              key: 'text',
              title: 'TextColumn',
              type: 'text'
            },
            {
              key: 'select',
              title: 'SelectColumn',
              type: 'select',
              selectOptions: [
                {
                  color: 'color',
                  value: 'option1',
                  label: 'option1'
                }
              ]
            }
          ]
        }
      }
    },
    extension: {
      options: {}
    },
    updateAttributes: () => {}
  }

  beforeEach(() => {
    buildTableSource(editorDataSource)
  })

  it('adds single filter option normally', () => {
    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} />
      </EditorDataSourceContext.Provider>
    )

    fireEvent.click(screen.getByText('table.filter.text'))
    fireEvent.click(screen.getByText('table.filter.add_a_filter'))
    fireEvent.click(screen.getAllByText('table.filter.add_a_filter')[1])

    expect(screen.getByTestId('brickdoc-table-filter-group')).toBeInTheDocument()
    expect(screen.getByText('table.filter.where')).toBeInTheDocument()
  })

  it('adds group filter option normally', () => {
    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} />
      </EditorDataSourceContext.Provider>
    )

    fireEvent.click(screen.getByText('table.filter.text'))
    fireEvent.click(screen.getByText('table.filter.add_a_filter'))
    fireEvent.click(screen.getByText('table.filter.add_a_filter_group'))

    expect(screen.getAllByTestId('brickdoc-table-filter-group')).toHaveLength(2)
  })
})
