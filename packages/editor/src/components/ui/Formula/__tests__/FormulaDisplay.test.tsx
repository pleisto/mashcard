import { VariableDisplayData } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaDisplay } from '..'

describe('FormulaDisplay', () => {
  it('renders normal type empty correctly', () => {
    const { container } = render(<FormulaDisplay formulaType="normal" />)

    expect(container).toMatchSnapshot()
  })

  it('renders spreadsheet type empty correctly', () => {
    const { container } = render(<FormulaDisplay formulaType="spreadsheet" />)

    expect(container).toMatchSnapshot()
  })

  it('renders literal kind correctly', () => {
    const displayData: VariableDisplayData = {
      definition: `="string"`,
      result: {
        type: 'literal',
        result: 'string'
      },
      meta: { namespaceId: '', variableId: '', name: '', richType: { type: 'normal' }, input: '', position: 0 },
      display: 'string'
    }
    const { container } = render(<FormulaDisplay formulaType="normal" displayData={displayData} />)

    expect(container).toMatchSnapshot()
  })

  it('renders constant kind correctly', () => {
    const displayData: VariableDisplayData = {
      definition: `="string"`,
      result: {
        type: 'string',
        result: 'string'
      },
      meta: { namespaceId: '', variableId: '', name: '', richType: { type: 'normal' }, input: '', position: 0 },
      display: 'string'
    }
    const { container } = render(<FormulaDisplay formulaType="normal" displayData={displayData} />)

    expect(container).toMatchSnapshot()
  })
})
