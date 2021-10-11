import { Table } from '../Table'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDatabaseRows } from '../useDatabaseRows'

// see more tests in e2e testing
describe('Table Filter', () => {
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
      options: {
        useDatabaseRows
      }
    },
    updateAttributes: () => {}
  }

  it('adds single filter option normally', () => {
    render(<Table {...props} />)

    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Add a Filter'))
    fireEvent.click(screen.getByText('Add a filter'))

    expect(screen.getByTestId('brickdoc-table-filter-group')).toBeInTheDocument()
    expect(screen.getByText('Where')).toBeInTheDocument()
  })

  it('adds group filter option normally', () => {
    render(<Table {...props} />)

    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Add a Filter'))
    fireEvent.click(screen.getByText('Add a filter group'))

    expect(screen.getAllByTestId('brickdoc-table-filter-group')).toHaveLength(2)
  })
})
