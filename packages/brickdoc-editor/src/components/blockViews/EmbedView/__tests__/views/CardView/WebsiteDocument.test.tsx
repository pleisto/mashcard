import { render } from '@testing-library/react'
import { WebsiteDocument } from '../../../views/CardView/WebsiteDocument'

describe('WebsiteDocument', () => {
  it('renders WebsiteDocument correctly', () => {
    const updateEmbedBlockAttributes = jest.fn()
    const { container } = render(
      <WebsiteDocument
        blockType="link"
        icon="icon"
        title="title"
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
        url="url"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
