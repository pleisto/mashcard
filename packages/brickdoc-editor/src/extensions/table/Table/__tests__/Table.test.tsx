import React from 'react'
import { Table } from '../Table'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDatabaseRows } from '../useDatabaseRows'

describe('Table', () => {
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
      options: {
        useDatabaseRows
      }
    },
    updateAttributes: () => {}
  }

  it('matches correct snapshot', () => {
    const { container } = render(<Table {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders table correctly', () => {
    render(<Table {...props} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('adds new column normally', () => {
    const updateAttributes = (attrs: any): void => {
      props.node.attrs = {
        ...props.node.attrs,
        ...attrs
      }

      rerender(<Table {...props} />)
    }
    const { rerender } = render(<Table {...props} updateAttributes={updateAttributes} />)

    const columnHeaders = screen.getAllByRole('columnheader')

    const addButtonColumn = columnHeaders[columnHeaders.length - 1]

    const addButton = addButtonColumn.querySelector('button')!

    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)

    const newColumnHeaders = screen.getAllByRole('columnheader')

    expect(newColumnHeaders.length - columnHeaders.length).toBe(1)
    expect(screen.getByText('Column1')).toBeInTheDocument()
  })

  it(`updates column's name normally`, () => {
    const updateAttributes = (attrs: any): void => {
      props.node.attrs = {
        ...props.node.attrs,
        ...attrs
      }

      rerender(<Table {...props} />)
    }
    const { rerender } = render(<Table {...props} updateAttributes={updateAttributes} />)
    const newName = 'new name'

    const columnHeaders = screen.getAllByRole('columnheader')
    const firstColumnHeader = columnHeaders[0]

    fireEvent.click(firstColumnHeader)

    const columnMenu = screen.getByRole('menu')
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

      rerender(<Table {...props} />)
    }
    const { rerender } = render(<Table {...props} updateAttributes={updateAttributes} />)

    const columnHeaders = screen.getAllByRole('columnheader')
    const firstColumnHeader = columnHeaders[0]

    fireEvent.click(firstColumnHeader)
    // clicks delete button on column menu
    fireEvent.click(screen.getByText('Delete'))
    // clicks delete button on confirm modal
    fireEvent.click(screen.getAllByText('Delete')[1])

    const newColumnHeaders = screen.getAllByRole('columnheader')

    expect(columnHeaders.length - newColumnHeaders.length).toBe(1)
  })

  it('adds new row by toolbar button normally', () => {
    render(<Table {...props} />)

    const rows = screen.getAllByRole('row')

    fireEvent.click(screen.getByText('New'))

    const newRows = screen.getAllByRole('row')

    expect(newRows.length - rows.length).toBe(1)

    const newRow = newRows[newRows.length - 1]

    expect(newRow.parentElement).toHaveClass('active')
  })

  it('adds new row by row action normally', () => {
    render(<Table {...props} />)

    fireEvent.click(screen.getByText('New'))

    const rows = screen.getAllByRole('row')
    const actions = screen.getByTestId('table-actions')
    fireEvent.click(actions.firstChild!)

    const newRows = screen.getAllByRole('row')

    expect(newRows.length - rows.length).toBe(1)

    const newRow = newRows[newRows.length - 1]

    expect(newRow.parentElement).toHaveClass('active')
  })

  describe('Row ContextMenu', () => {
    it('filters menu items normally', () => {
      render(<Table {...props} />)

      fireEvent.click(screen.getByText('New'))

      const rows = screen.getAllByRole('row')
      fireEvent.contextMenu(rows[1])
      fireEvent.change(screen.getByPlaceholderText('Filter actions...'), { target: { value: 'Del' } })

      const menuItems = screen.getAllByRole('menuitem')

      expect(menuItems).toHaveLength(2)
      expect(menuItems[1]).toHaveTextContent('Delete')

      fireEvent.change(screen.getByPlaceholderText('Filter actions...'), { target: { value: 'nonsense' } })
      expect(screen.getAllByRole('menuitem')).toHaveLength(1)
    })

    it('removes row by click delete button', () => {
      render(<Table {...props} />)

      fireEvent.click(screen.getByText('New'))

      const rows = screen.getAllByRole('row')
      fireEvent.contextMenu(rows[1])
      fireEvent.click(screen.getByText('Delete'))
      fireEvent.click(screen.getAllByText('Delete')[1])

      const newRows = screen.getAllByRole('row')

      expect(rows.length - newRows.length).toBe(1)
    })
  })
})
