import { Table } from '../Table'
import { render, screen, fireEvent } from '@testing-library/react'
import { EditorDataSource, EditorDataSourceContext, useDatabaseRowsReturn } from '../../../dataSource/DataSource'
import { DatabaseRow } from '../../../extensions/table'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

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

describe('Table', () => {
  const editorDataSource = new EditorDataSource()

  const props: any = {
    editor: {},
    node: {
      attrs: {
        data: {
          columns: [
            {
              key: 'key',
              title: 'Column',
              type: 'text'
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

  it('matches correct snapshot', () => {
    const { container } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} />
      </EditorDataSourceContext.Provider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders table correctly', () => {
    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} />
      </EditorDataSourceContext.Provider>
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('adds new column normally', () => {
    const updateAttributes = (attrs: any): void => {
      props.node.attrs = {
        ...props.node.attrs,
        ...attrs
      }

      rerender(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <Table {...props} />
        </EditorDataSourceContext.Provider>
      )
    }
    const { rerender } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} updateAttributes={updateAttributes} />
      </EditorDataSourceContext.Provider>
    )

    const columnHeaders = screen.getAllByRole('columnheader')

    const addButtonColumn = columnHeaders[columnHeaders.length - 1]

    const addButton = addButtonColumn.querySelector('button')!

    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)

    const newColumnHeaders = screen.getAllByRole('columnheader')

    expect(newColumnHeaders.length - columnHeaders.length).toBe(1)
    expect(screen.getByText('table.column_default_name2')).toBeInTheDocument()
  })

  it(`updates column's name normally`, () => {
    const updateAttributes = (attrs: any): void => {
      props.node.attrs = {
        ...props.node.attrs,
        ...attrs
      }

      rerender(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <Table {...props} />
        </EditorDataSourceContext.Provider>
      )
    }
    const { rerender } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} updateAttributes={updateAttributes} />
      </EditorDataSourceContext.Provider>
    )
    const newName = 'new name'

    const columnHeaders = screen.getAllByRole('columnheader')
    const firstColumnHeader = columnHeaders[0]

    fireEvent.click(firstColumnHeader)

    const columnMenu = screen.getByRole('menubar')
    expect(columnMenu).toBeInTheDocument()

    const input = columnMenu.querySelector('input')!
    fireEvent.change(input, { target: { value: newName } })

    expect(screen.getByText(newName)).toBeInTheDocument()
  })

  it('removes column normally', () => {
    const updateAttributes = (attrs: any): void => {
      props.node.attrs = {
        ...props.node.attrs,
        ...attrs
      }

      rerender(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <Table {...props} />
        </EditorDataSourceContext.Provider>
      )
    }
    const { rerender } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} updateAttributes={updateAttributes} />
      </EditorDataSourceContext.Provider>
    )

    const columnHeaders = screen.getAllByRole('columnheader')
    const firstColumnHeader = columnHeaders[0]

    fireEvent.click(firstColumnHeader)
    // clicks delete button on column menu
    fireEvent.click(screen.getByText('table.remove_column.text'))
    // clicks delete button on confirm modal
    fireEvent.click(screen.getByText('table.remove_column.ok'))

    const newColumnHeaders = screen.getAllByRole('columnheader')

    expect(columnHeaders.length - newColumnHeaders.length).toBe(1)
  })

  it('adds new row by toolbar button normally', () => {
    const { rerender } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} />
      </EditorDataSourceContext.Provider>
    )

    editorDataSource.onUpdate(() => {
      rerender(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <Table {...props} />
        </EditorDataSourceContext.Provider>
      )
    })

    const rows = screen.getAllByRole('row')

    fireEvent.click(screen.getByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id))

    const newRows = screen.getAllByRole('row')

    expect(newRows.length - rows.length).toBe(1)

    const newRow = newRows[newRows.length - 1]

    expect(newRow.parentElement).toHaveClass('active')
  })

  it('adds new row by row action normally', () => {
    const { rerender } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <Table {...props} />
      </EditorDataSourceContext.Provider>
    )

    fireEvent.click(screen.getByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id))

    editorDataSource.onUpdate(() => {
      rerender(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <Table {...props} />
        </EditorDataSourceContext.Provider>
      )
    })

    const rows = screen.getAllByRole('row')
    fireEvent.click(screen.getByTestId(TEST_ID_ENUM.editor.tableBlock.row.actions.addButton.id))

    const newRows = screen.getAllByRole('row')

    expect(newRows.length - rows.length).toBe(1)

    const newRow = newRows[newRows.length - 1]

    expect(newRow.parentElement).toHaveClass('active')
  })

  describe('Row ContextMenu', () => {
    it('filters menu items normally', () => {
      const { rerender } = render(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <Table {...props} />
        </EditorDataSourceContext.Provider>
      )

      editorDataSource.onUpdate(() => {
        rerender(
          <EditorDataSourceContext.Provider value={editorDataSource}>
            <Table {...props} />
          </EditorDataSourceContext.Provider>
        )
      })

      fireEvent.click(screen.getByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id))

      const rows = screen.getAllByRole('row')
      fireEvent.contextMenu(rows[1])
      fireEvent.change(screen.getByPlaceholderText('Filter actions...'), { target: { value: 'Del' } })

      const menuItems = screen.getAllByRole('menuitem')

      expect(menuItems).toHaveLength(2)

      fireEvent.change(screen.getByPlaceholderText('Filter actions...'), { target: { value: 'nonsense' } })
      expect(screen.getAllByRole('menuitem')).toHaveLength(1)
    })
  })
})
