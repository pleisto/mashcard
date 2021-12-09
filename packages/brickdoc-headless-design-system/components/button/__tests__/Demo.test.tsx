import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(container.getElementsByTagName('button').length).toBeGreaterThan(0)
  })
})
