import { render } from '@testing-library/react'
import { CardCover } from '../../../embedViews'

describe('CardCover', () => {
  it('renders nothing if no cover exist', () => {
    const { container } = render(<CardCover blockType="attachment" />)

    expect(container.firstChild).toBeNull()
  })
})
