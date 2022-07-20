import { renderHook, act } from '@testing-library/react'
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

jest.useRealTimers()

describe('usePdftronDocument', () => {
  it('marks document ready when document has been setup', async () => {
    const { result } = renderHook(() => usePdftronDocument('doc'))

    // wait for async effect
    await act(async () => {
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 10)
      })
    })

    const [documentStatus] = result.current

    expect(documentStatus).toBe('ready')
  })

  it('toggles full screen correctly', async () => {
    const { result } = renderHook(() => usePdftronDocument('doc'))

    // wait for async effect
    await act(async () => {
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 10)
      })
    })

    expect(() => {
      result.current[2]()
    }).not.toThrow()
  })
})
