import { render, screen } from '@testing-library/react'
import { CardIcon } from '../../../embedViews'

describe('CardIcon', () => {
  it('renders icon normally', () => {
    const icon = 'icon'
    render(<CardIcon blockType="link" icon={<span>{icon}</span>} />)

    expect(screen.getByText(icon)).toBeInTheDocument()
  })

  it('renders normally if icon is string type', () => {
    const { container } = render(<CardIcon blockType="link" icon="icon" />)

    expect(container).toMatchSnapshot()
  })
})
