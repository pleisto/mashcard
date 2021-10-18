import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Image', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container.getElementsByClassName('brk-image-img').length).toBeGreaterThan(0)
  })
})
