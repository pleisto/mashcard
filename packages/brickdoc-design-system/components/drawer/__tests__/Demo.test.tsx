import { Base } from '../demos'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Drawer', () => {
  it('basic demo should rendered', () => {
    const { baseElement } = render(<Base />)
    fireEvent.click(screen.getByRole('button'))
    expect(baseElement.getElementsByClassName('brk-drawer').length).toBeGreaterThan(0)
  })
})
