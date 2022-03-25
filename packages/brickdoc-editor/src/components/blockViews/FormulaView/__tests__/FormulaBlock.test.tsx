import { render } from '@testing-library/react'
import { mockBlockViewProps } from '../../../common/tests'
import { FormulaBlock, FormulaBlockProps } from '../FormulaBlock'

describe('FormulaBlock', () => {
  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<{}, FormulaBlockProps>()
    const { container } = render(<FormulaBlock {...props} />)

    expect(container).toMatchSnapshot()
  })
})
