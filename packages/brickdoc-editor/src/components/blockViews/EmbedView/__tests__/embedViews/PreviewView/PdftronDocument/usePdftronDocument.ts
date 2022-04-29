/* eslint-disable max-nested-callbacks */
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { usePdftronDocument } from '../../../../embedViews/PreviewView/PdftronDocument/usePdftronDocument'

jest.mock('@pdftron/webviewer', () => ({
  __esModule: true,
  default: async () =>
    await Promise.resolve({
      UI: {
        FitMode: {
          FitWidth: 1
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
    await act(async () => {
      const { result } = renderHook(() => usePdftronDocument('doc'))

      // wait for async effect
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 10)
      })

      const [documentReady] = result.current

      expect(documentReady).toBeTruthy()
    })
  })
})
