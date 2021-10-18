import { Base } from '../demos'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Popover', () => {
  it('basic demo should rendered', () => {
    render(<Base />)
    fireEvent.click(screen.getByText('Click me'))
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
