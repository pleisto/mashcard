import { UploadResultData } from '@mashcard/uploader'
import { renderHook } from '@testing-library/react'
import { useDashboardProps } from '../useIcon'

describe('useIcon', () => {
  it('updates image icon by onUploaded correctly', () => {
    const setVisible = jest.fn()
    const extension: any = {
      options: {
        prepareFileUpload: jest.fn()
      }
    }
    const updateAttributes = jest.fn()
    const { result } = renderHook(() =>
      useDashboardProps({
        setVisible,
        extension,
        updateAttributes
      })
    )

    const uploadData: UploadResultData = {
      action: 'add',
      url: 'url',
      viewUrl: 'viewUrl'
    }

    result.current.onUploaded?.(uploadData)

    expect(updateAttributes).toBeCalledWith({
      icon: {
        type: 'IMAGE',
        source: 'ORIGIN',
        key: uploadData.url,
        viewUrl: uploadData.viewUrl
      }
    })
  })

  it('updates emoji icon by onUploaded correctly', () => {
    const setVisible = jest.fn()
    const extension: any = {
      options: {
        prepareFileUpload: jest.fn()
      }
    }
    const updateAttributes = jest.fn()
    const { result } = renderHook(() =>
      useDashboardProps({
        setVisible,
        extension,
        updateAttributes
      })
    )

    const uploadData: UploadResultData = {
      action: 'add',
      emoji: {
        name: 'name',
        emoji: 'emoji',
        emoji_version: 'version',
        skin_tone_support: true,
        slug: 'slug',
        unicode_version: 'version'
      }
    }

    result.current.onUploaded?.(uploadData)

    expect(updateAttributes).toBeCalledWith({
      icon: {
        type: 'EMOJI',
        name: uploadData.emoji?.name,
        emoji: uploadData.emoji?.emoji
      }
    })
  })

  it('handles prepareFileUpload correctly', async () => {
    const setVisible = jest.fn()
    const extension: any = {
      options: {
        prepareFileUpload: jest.fn()
      }
    }
    const updateAttributes = jest.fn()
    const { result } = renderHook(() =>
      useDashboardProps({
        setVisible,
        extension,
        updateAttributes
      })
    )

    await result.current.prepareFileUpload?.('blockId', 'type', 'file')

    expect(extension.options.prepareFileUpload).toBeCalledWith('type', 'file')
  })
})
