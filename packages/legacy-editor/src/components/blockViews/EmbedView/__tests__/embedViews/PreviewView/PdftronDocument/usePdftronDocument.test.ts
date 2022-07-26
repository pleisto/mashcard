import { renderHook, waitFor } from '@testing-library/react'
import { usePdftronDocument } from '../../../../embedViews/PreviewView/PdftronDocument/usePdftronDocument'

jest.mock('@pdftron/webviewer', () => ({
  __esModule: true,
  default: async () =>
    await Promise.resolve({
      UI: {
        toggleFullScreen: () => {},
        addEventListener: (event: string, cb: Function) => {
          if (event === 'LOAD_ERROR') return
          cb()
        },
        FitMode: {
          FitWidth: 1
        },
        Events: {
          LOAD_ERROR: 'LOAD_ERROR'
        },
        setFitMode: () => {}
      },
      Core: {
        documentViewer: {
          addEventListener: (event: string, cb: Function) => {
            cb()
          }
        }
      }
    })
}))

describe('usePdftronDocument', () => {
  it('marks document ready when document has been setup', async () => {
    const { result } = renderHook(() => usePdftronDocument('doc'))

    await waitFor(() => {
      const [documentStatus] = result.current
      expect(documentStatus).toBe('ready')
    })
  })

  it('toggles full screen correctly', async () => {
    const { result } = renderHook(() => usePdftronDocument('doc'))

    await waitFor(() => {
      const [documentStatus] = result.current
      expect(documentStatus).toBe('ready')
    })

    const [, , toggleFullScreen] = result.current
    expect(() => {
      toggleFullScreen()
    }).not.toThrow()
  })
})
