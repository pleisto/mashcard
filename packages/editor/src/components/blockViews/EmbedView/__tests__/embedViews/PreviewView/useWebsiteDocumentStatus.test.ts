import { renderHook, act } from '@testing-library/react'
import { useWebsiteDocumentStatus } from '../../../embedViews/PreviewView/useWebsiteDocumentStatus'

describe('useWebsiteDocumentStatus', () => {
  it('loads error document status correctly', () => {
    const { result } = renderHook(() => useWebsiteDocumentStatus())

    const [, handleLoad] = result.current

    expect(result.current[0]).toBe(false)

    act(() => {
      handleLoad({
        target: {
          contentWindow: {
            window: {
              length: 0
            }
          }
        }
      })
    })

    expect(result.current[0]).toBe(true)
  })
})
