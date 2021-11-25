import { Table } from '../Table'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDatabaseRows } from '../useDatabaseRows'
import { ContextInterface, VariableInterface } from '@brickdoc/formula'
import { FormulaOptions } from '../../..'

const formulaContextActions: FormulaOptions['formulaContextActions'] = {
  getFormulaContext: (): null => null,
  getVariable: (variableId: string): null => null,
  removeVariable: (variableId: string): void => {},
  calculate: (
    variableId: string | undefined,
    name: string,
    input: string,
    formulaContext: ContextInterface,
    updateResult: React.Dispatch<React.SetStateAction<any>>,
    updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>>,
    updateError: React.Dispatch<
      React.SetStateAction<
        | {
            type: string
            message: string
          }
        | undefined
      >
    >,
    updateValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    updateDefaultName: React.Dispatch<React.SetStateAction<string>>
  ): void => {}
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
