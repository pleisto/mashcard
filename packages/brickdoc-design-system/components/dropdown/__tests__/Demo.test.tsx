import { Base } from '../demos'
import { render } from '@testing-library/react'

describe('Dropdown', () => {
  it('basic demo should rendered', () => {
    const { baseElement } = render(<Base />)
    expect(baseElement.getElementsByClassName('brk-dropdown-trigger').length).toBeGreaterThan(0)
  })
})
