import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('Affix', () => {
  it('basic demo should rendered', () => {
    render(<Base />)
    expect(screen.getByText('Affix')).toBeInTheDocument()
  })
})
