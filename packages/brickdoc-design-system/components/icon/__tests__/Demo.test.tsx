import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Icon', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container.getElementsByClassName('brk-icon-apple').length).toBeGreaterThan(0)
  })
})
