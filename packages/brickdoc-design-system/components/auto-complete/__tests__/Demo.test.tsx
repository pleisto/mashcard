import { Base } from '../demos'
import { render, screen } from '@testing-library/react'

describe('AutoComplete', () => {
  it('basic demo should rendered', () => {
    const { container } = render(<Base />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(container.getElementsByClassName('brk-select-selector').length).toBeGreaterThan(0)
  })
})
