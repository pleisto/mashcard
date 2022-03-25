import { renderHook } from '@testing-library/react-hooks'
import { useAttachmentMethods } from '../modes/useAttachmentMethods'

describe('useAttachmentMethods', () => {
  it('onToLinkMode works correctly', () => {
    const fileUrl = 'file-url'
    const updateAttachmentAttributes = jest.fn()
    const { result } = renderHook(() => useAttachmentMethods({ fileUrl, updateAttachmentAttributes }))

    const { onToLinkMode } = result.current[0]

    onToLinkMode()

    expect(updateAttachmentAttributes).toBeCalledWith({ mode: 'link' })
  })

  it('onToPreviewMode works correctly', () => {
    const fileUrl = 'file-url'
    const updateAttachmentAttributes = jest.fn()
    const { result } = renderHook(() => useAttachmentMethods({ fileUrl, updateAttachmentAttributes }))

    const { onToPreviewMode } = result.current[0]

    onToPreviewMode()

    expect(updateAttachmentAttributes).toBeCalledWith({ mode: 'preview' })
  })

  it('onFullScreen works correctly', () => {
    const fileUrl = 'file-url'
    const updateAttachmentAttributes = jest.fn()
    const webViewer: any = {
      UI: {
        toggleFullScreen: jest.fn()
      }
    }

    const { result } = renderHook(() => useAttachmentMethods({ webViewer, fileUrl, updateAttachmentAttributes }))

    const { onFullScreen } = result.current[0]

    onFullScreen()

    expect(webViewer.UI.toggleFullScreen).toBeCalled()
  })

  it('onDownload works correctly', () => {
    const fileUrl = 'file-url'
    const updateAttachmentAttributes = jest.fn()
    const webViewer: any = {
      UI: {
        downloadPdf: jest.fn()
      }
    }

    const { result } = renderHook(() => useAttachmentMethods({ webViewer, fileUrl, updateAttachmentAttributes }))

    const { onDownload } = result.current[0]

    onDownload()

    expect(webViewer.UI.downloadPdf).toBeCalled()
  })

  it('onDownload works correctly without webViewer', () => {
    const fileUrl = 'file-url'
    const updateAttachmentAttributes = jest.fn()

    const { result } = renderHook(() => useAttachmentMethods({ fileUrl, updateAttachmentAttributes }))

    const { onDownload } = result.current[0]

    expect(() => onDownload()).not.toThrow()
  })
})
