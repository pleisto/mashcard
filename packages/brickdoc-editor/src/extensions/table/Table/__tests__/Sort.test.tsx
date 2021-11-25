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
