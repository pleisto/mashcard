import { renderHook } from '@testing-library/react-hooks'
import { useResizable } from '../../../embedViews/ImageView/useResizable'

describe('useResizable', () => {
  it('triggers onResizeStop will update image width', () => {
    const updateEmbedBlockAttributes = jest.fn()
    const width = 5

    const { result } = renderHook(() => useResizable(updateEmbedBlockAttributes, width))
    const { onResizeStop } = result.current

    onResizeStop?.(null as any, null as any, null as any, { width, height: 1 })

    expect(updateEmbedBlockAttributes).toBeCalledWith({ width: width + width }, 'image')
  })
})
