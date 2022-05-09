import { renderHook } from '@testing-library/react-hooks'
import { useWebsiteDocumentStatus } from '../../../embedViews/PreviewView/useWebsiteDocumentStatus'

describe('useWebsiteDocumentStatus', () => {
  it('loads error document status correctly', () => {
    const { result } = renderHook(() => useWebsiteDocumentStatus())

    const [, handleLoad] = result.current

    expect(result.current[0]).toBe(false)

    handleLoad({})

    expect(result.current[0]).toBe(true)
  })
})
