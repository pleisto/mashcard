import { VariableDisplayData } from '@brickdoc/formula'
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
      kind: 'literal',
      definition: `="string"`,
      type: 'normal',
      result: {
        type: 'string',
        result: 'string'
      },
      meta: {} as any,
      version: 1,
      display: 'string'
    }
    const { container } = render(<FormulaDisplay formulaType="normal" displayData={displayData} />)

    expect(container).toMatchSnapshot()
  })

  it('renders constant kind correctly', () => {
    const displayData: VariableDisplayData = {
      kind: 'constant',
      definition: `="string"`,
      type: 'normal',
      result: {
        type: 'string',
        result: 'string'
      },
      meta: {} as any,
      version: 1,
      display: 'string'
    }
    const { container } = render(<FormulaDisplay formulaType="normal" displayData={displayData} />)

    expect(container).toMatchSnapshot()
  })
})
