import { fireEvent, render, screen } from '@testing-library/react'
import { EmbedAttributes, EmbedOptions } from '../../../../../../extensions'
import { mockBlockViewProps } from '../../../../../../test'
import { TextView } from '../../../embedViews'

describe('TextView', () => {
  it('opens url normally when click view', () => {
    const mockOpenUrl = jest.fn()
    jest.spyOn(window, 'open').mockImplementation(url => mockOpenUrl(url))
    const props = mockBlockViewProps<EmbedOptions, EmbedAttributes>()
    const url = 'url'
    const updateEmbedBlockAttributes = jest.fn()
    const name = 'name'
    render(
      <TextView
        blockType="link"
        {...props}
        name={name}
        url={url}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
        fileType="html"
      />
    )

    fireEvent.click(screen.getByText(name))

    expect(mockOpenUrl).toBeCalledWith(url)
  })
})
