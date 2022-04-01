import { render } from '@testing-library/react'
import { VariableDisplayData } from '@brickdoc/formula'
import { FormulaValue } from '../FormulaValue'

describe('FormulaValue', () => {
  it('renders borderless correctly', () => {
    const data: VariableDisplayData = {
      result: {
        type: 'Error',
        errorKind: 'fatal',
        result: 'error'
      },
      definition: '',
      kind: 'constant',
      type: 'normal',
      version: 1,
      meta: {} as any,
      display: 'display'
    }

    const { container } = render(<FormulaValue border={false} display="display" displayData={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders Waiting/Pending type correctly', () => {
    const data: VariableDisplayData = {
      result: {
        type: 'Waiting',
        result: 'waiting'
      },
      definition: '',
      kind: 'constant',
      type: 'normal',
      version: 1,
      meta: {} as any,
      display: 'display'
    }

    const { container } = render(<FormulaValue border={true} display="display" displayData={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders Error type correctly', () => {
    const data: VariableDisplayData = {
      result: {
        type: 'Error',
        errorKind: 'fatal',
        result: 'error'
      },
      definition: '',
      kind: 'constant',
      type: 'normal',
      version: 1,
      meta: {} as any,
      display: 'display'
    }

    const { container } = render(<FormulaValue border={true} display="display" displayData={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders Number type correctly', () => {
    const data: VariableDisplayData = {
      result: {
        type: 'number',
        result: 1
      },
      definition: '',
      kind: 'constant',
      type: 'normal',
      version: 1,
      meta: {} as any,
      display: 'display'
    }

    const { container } = render(<FormulaValue border={true} display="display" displayData={data} />)

    expect(container).toMatchSnapshot()
  })
})
