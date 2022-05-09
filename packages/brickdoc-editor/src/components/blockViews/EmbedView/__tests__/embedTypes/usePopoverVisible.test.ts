import { BlockJustCreated, BrickdocEventBus } from '@brickdoc/schema'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { usePopoverVisible } from '../../embedTypes/usePopoverVisible'

jest.useFakeTimers()

describe('EmbedView > usePopoverVisible', () => {
  it('responds for BlockJustCreated event correctly', () => {
    const id = 'id'
    const { result } = renderHook(() => usePopoverVisible(id))

    expect(result.current[0]).toBeFalsy()

    act(() => {
      BrickdocEventBus.dispatch(BlockJustCreated({ id }))
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
