import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('Anchor', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(screen.getByText('Basic demo')).toBeInTheDocument()
    expect(container.getElementsByClassName('brk-anchor-link').length).toBeGreaterThan(0)
  })
})
