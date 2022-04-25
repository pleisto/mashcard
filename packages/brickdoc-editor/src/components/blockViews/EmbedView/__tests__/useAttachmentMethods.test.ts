import { renderHook } from '@testing-library/react-hooks'
import { useAttachmentMethods } from '../views/useAttachmentMethods'

describe('useAttachmentMethods', () => {
  it('onFullScreen works correctly', () => {
    const fileUrl = 'file-url'
    const updateEmbedBlockAttributes = jest.fn()
    const blockType = 'attachment'
    const webViewer: any = {
      UI: {
        toggleFullScreen: jest.fn()
      }
    }

    const { result } = renderHook(() =>
      useAttachmentMethods({ webViewer, fileUrl, blockType, updateEmbedBlockAttributes })
    )

    const { onFullScreen } = result.current[0]

    onFullScreen()

    expect(webViewer.UI.toggleFullScreen).toBeCalled()
  })

  it('onDownload works correctly', () => {
    const fileUrl = 'file-url'
    const updateEmbedBlockAttributes = jest.fn()
    const blockType = 'attachment'
    const webViewer: any = {
      UI: {
        downloadPdf: jest.fn()
      }
    }

    const { result } = renderHook(() =>
      useAttachmentMethods({ webViewer, fileUrl, blockType, updateEmbedBlockAttributes })
    )

    const { onDownload } = result.current[0]

    onDownload()

    expect(webViewer.UI.downloadPdf).toBeCalled()
  })

  it('onDownload works correctly without webViewer', () => {
    const fileUrl = 'file-url'
    const updateEmbedBlockAttributes = jest.fn()
    const blockType = 'attachment'

    const { result } = renderHook(() => useAttachmentMethods({ fileUrl, blockType, updateEmbedBlockAttributes }))

    const { onDownload } = result.current[0]

    expect(() => onDownload()).not.toThrow()
  })
})
