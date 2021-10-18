import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('Alert', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(screen.getByText('Success Text')).toBeInTheDocument()
    expect(container.getElementsByClassName('brk-alert-info').length).toBeGreaterThan(0)
  })
})
