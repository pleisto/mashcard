import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Layout', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container).toMatchSnapshot()
  })
})
