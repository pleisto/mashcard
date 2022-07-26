import { BlockJustCreated, MashcardEventBus } from '@mashcard/schema'
import { renderHook, act } from '@testing-library/react'
import { usePopoverVisible } from '../../embedTypes/usePopoverVisible'

describe('EmbedView > usePopoverVisible', () => {
  it('responds for BlockJustCreated event correctly', () => {
    const id = 'id'
    const { result } = renderHook(() => usePopoverVisible(id))

    expect(result.current[0]).toBeFalsy()

    act(() => {
      MashcardEventBus.dispatch(BlockJustCreated({ id }))
      jest.runAllTimers()
    })

    expect(result.current[0]).toBeTruthy()
  })

  it('changes visible normally', () => {
    const id = 'id'
    const { result } = renderHook(() => usePopoverVisible(id))

    const [, onVisibleChange] = result.current

    expect(result.current[0]).toBeFalsy()

    act(() => {
      onVisibleChange(true)
    })

    expect(result.current[0]).toBeTruthy()
  })
})
