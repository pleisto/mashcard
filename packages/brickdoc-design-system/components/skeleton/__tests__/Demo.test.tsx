import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Skeleton', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container).toMatchSnapshot()
  })
})
