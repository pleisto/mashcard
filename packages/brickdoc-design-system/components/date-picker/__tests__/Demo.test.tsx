import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('DatePicker', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container.getElementsByClassName('brk-picker').length).toBeGreaterThan(0)
  })
})
