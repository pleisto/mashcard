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
describe('Table Sort', () => {
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
                },
                {
                  color: 'color',
                  value: 'option2',
                  label: 'option2'
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

  it('adds single sort normally', () => {
    render(<Table {...props} />)

    fireEvent.click(screen.getByText('table.sort.text'))
    fireEvent.click(screen.getByText('Add a Sort'))

    expect(screen.getByRole('group')).toBeInTheDocument()
  })
})
