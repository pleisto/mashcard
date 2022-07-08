import { render } from '@testing-library/react'
import { VariableDisplayData } from '@mashcard/formula'
import { FormulaValue } from '../FormulaValue'

describe('FormulaValue', () => {
  it('renders borderless correctly', () => {
    const data: VariableDisplayData = {
      result: { type: 'Error', meta: 'fatal', result: 'error' },
      display: { type: 'Error', result: '[fatal] error' },
      type: 'normal',
      definition: ''
    }

    const { container } = render(<FormulaValue border={false} displayData={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders Waiting/Pending type correctly', () => {
    const data: VariableDisplayData = {
      result: { type: 'Waiting', result: 'waiting' },
      display: { type: 'Waiting', result: 'waiting' },
      type: 'normal',
      definition: ''
    }

    const { container } = render(<FormulaValue border={true} displayData={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders Error type correctly', () => {
    const data: VariableDisplayData = {
      result: { type: 'Error', meta: 'fatal', result: 'error' },
      display: { type: 'Error', result: '[fatal] error' },
      type: 'normal',
      definition: ''
    }

    const { container } = render(<FormulaValue border={true} displayData={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders Number type correctly', () => {
    const data: VariableDisplayData = {
      result: { type: 'number', result: 1 },
      display: { type: 'number', result: '1' },
      type: 'normal',
      definition: ''
    }

    const { container } = render(<FormulaValue border={true} displayData={data} />)

    expect(container).toMatchSnapshot()
  })
})
