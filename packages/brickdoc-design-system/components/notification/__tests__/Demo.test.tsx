import { Base } from '../demos'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Notification', () => {
  it('basic demo should rendered', () => {
    const { baseElement } = render(<Base />)
    fireEvent.click(screen.getByText('Success'))
    expect(baseElement.getElementsByClassName('brk-notification').length).toBeGreaterThan(0)
  })
})
