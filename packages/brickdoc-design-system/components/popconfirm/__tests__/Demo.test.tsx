import { Base } from '../demos'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Popconfirm', () => {
  it('basic demo should rendered', () => {
    render(<Base />)
    fireEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Are you sure to delete this task?')).toBeInTheDocument()
  })
})
