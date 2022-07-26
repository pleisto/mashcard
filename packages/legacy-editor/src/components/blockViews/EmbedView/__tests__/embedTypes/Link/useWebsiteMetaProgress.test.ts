import { renderHook, act } from '@testing-library/react'
import { useWebsiteMetaProgress } from '../../../embedTypes/Link/useWebsiteMetaProgress'

describe('useWebsiteMetaProgress', () => {
  it('progressing correctly', () => {
    const { result } = renderHook(() => useWebsiteMetaProgress())

    const [progress, , progressing] = result.current

    expect(progress.percentage).toEqual(0)

    act(() => {
      progressing()
      jest.runOnlyPendingTimers()
    })

    expect(result.current[0].percentage).toEqual(0.1)

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current[0].percentage).toEqual(0.2)
  })

  it('resets progress correctly', () => {
    const { result } = renderHook(() => useWebsiteMetaProgress())

    const [progress, resetProgress, progressing] = result.current

    expect(progress.percentage).toEqual(0)

    act(() => {
      progressing()
    })

    act(() => {
      resetProgress(100)
    })

    expect(result.current[0].percentage).toEqual(1)
  })
})
