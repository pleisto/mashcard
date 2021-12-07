import { Table } from '../Table'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDatabaseRows } from '../useDatabaseRows'
import { FormulaOptions } from '../../..'

const formulaContextActions: FormulaOptions['formulaContextActions'] = {
  getFormulaContext: (): null => null,
  getVariable: (variableId: string): undefined => undefined,
  removeVariable: (variableId: string): void => {},
  calculate: (): void => {}
}

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
        useDatabaseRows,
        formulaContextActions
      }
    },
    updateAttributes: () => {}
  }

  it('adds single filter option normally', () => {
    render(<Table {...props} />)

    fireEvent.click(screen.getByText('table.filter.text'))
    fireEvent.click(screen.getByText('table.filter.add_a_filter'))
    fireEvent.click(screen.getAllByText('table.filter.add_a_filter')[1])

    expect(screen.getByTestId('brickdoc-table-filter-group')).toBeInTheDocument()
    expect(screen.getByText('table.filter.where')).toBeInTheDocument()
  })

  it('adds group filter option normally', () => {
    render(<Table {...props} />)

    fireEvent.click(screen.getByText('table.filter.text'))
    fireEvent.click(screen.getByText('table.filter.add_a_filter'))
    fireEvent.click(screen.getByText('table.filter.add_a_filter_group'))

    expect(screen.getAllByTestId('brickdoc-table-filter-group')).toHaveLength(2)
  })
})
