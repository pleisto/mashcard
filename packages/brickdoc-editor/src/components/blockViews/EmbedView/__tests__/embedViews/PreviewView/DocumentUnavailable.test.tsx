import { fireEvent, render, screen } from '@testing-library/react'
import { DocumentUnavailable } from '../../../embedViews/PreviewView/DocumentUnavailable'

Object.assign(window, {
  open: () => {}
})

describe('DocumentUnavailable', () => {
  it('renders DocumentUnavailable correctly', () => {
    const { container } = render(<DocumentUnavailable url="url" />)

    expect(container).toMatchSnapshot()
  })

  it('opens link normally', () => {
    const mockOpenUrl = jest.fn()
    jest.spyOn(window, 'open').mockImplementation(url => mockOpenUrl(url))

    const url = 'url'

    render(<DocumentUnavailable url={url} />)

    fireEvent.click(screen.getByText('embed_block.view_types.preview.unavailable.link_button'))

    expect(mockOpenUrl).toBeCalledWith(url)
  })
})
