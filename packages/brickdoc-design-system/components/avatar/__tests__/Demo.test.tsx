import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Avatar', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container.getElementsByClassName('brk-avatar').length).toBeGreaterThan(0)
  })
})
