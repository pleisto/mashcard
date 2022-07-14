import { SlashMenu } from '../SlashMenu'
import { render } from '@testing-library/react'

describe('SlashMenu', () => {
  it('renders SlashMenu correctly', () => {
    const { container } = render(<SlashMenu />)
    expect(container).toMatchSnapshot()
  })
})
