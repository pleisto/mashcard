import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Card', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container.getElementsByClassName('brk-card-extra').length).toBeGreaterThan(0)
  })
})
