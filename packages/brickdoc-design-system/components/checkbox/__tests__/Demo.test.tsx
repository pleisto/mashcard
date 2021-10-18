import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('Checkbox', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(screen.getByText('Checkbox')).toBeInTheDocument()
    expect(container.getElementsByClassName('brk-checkbox').length).toBeGreaterThan(0)
  })
})
