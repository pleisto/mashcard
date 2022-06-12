import { render } from '@testing-library/react'
import { mockBlockViewProps } from '../../../../test'
import { FormulaBlock, FormulaBlockProps } from '../FormulaBlock'

describe('FormulaBlock', () => {
  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<{}, FormulaBlockProps>({
      editor: {
        extensionManager: {
          extensions: []
        }
      }
    })
    const { container } = render(<FormulaBlock {...props} />)

    expect(container).toMatchSnapshot()
  })
})
