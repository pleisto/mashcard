import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('BackTop', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(screen.getByText('Scroll down to see BackTo Button')).toBeInTheDocument()
    expect(container.getElementsByClassName('brk-back-top').length).toBeGreaterThan(0)
  })
})
