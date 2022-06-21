import { render } from '@testing-library/react'
import { SpreadsheetBlockView } from '..'
import { SpreadsheetAttributes, SpreadsheetOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'

describe('SpreadsheetBlockView', () => {
  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<SpreadsheetOptions, SpreadsheetAttributes>()
    const { container } = render(<SpreadsheetBlockView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
