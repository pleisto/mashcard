import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(screen.getByText('Primary Button')).toBeInTheDocument()
    expect(container.getElementsByClassName('brk-btn-link').length).toBeGreaterThan(0)
  })
})
