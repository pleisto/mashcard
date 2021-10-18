import { Base } from '../demos'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Modal', () => {
  it('basic demo should rendered', () => {
    render(<Base />)
    fireEvent.click(screen.getByText('Open Modal'))
    expect(screen.getByText('Basic Modal')).toBeInTheDocument()
  })
})
