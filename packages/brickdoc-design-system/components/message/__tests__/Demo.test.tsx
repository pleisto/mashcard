import { Base } from '../demos'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Message', () => {
  it('basic demo should rendered', () => {
    const { baseElement } = render(<Base />)
    fireEvent.click(screen.getByText('Success'))
    expect(baseElement.getElementsByClassName('brk-message').length).toBeGreaterThan(0)
  })
})
