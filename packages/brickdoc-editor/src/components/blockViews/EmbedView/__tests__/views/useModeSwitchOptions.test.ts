import { renderHook } from '@testing-library/react-hooks'
import { ToolbarItemOption } from '../../../../ui'
import { useModeSwitchOptions } from '../../views/useModeSwitchOptions'

describe('useModeSwitchOptions', () => {
  it('triggers card view correctly', () => {
    const blockType = 'attachment'
    const mode = 'card'
    const updateEmbedBlockAttributes = jest.fn()
    const { result } = renderHook(() => useModeSwitchOptions(mode, blockType, updateEmbedBlockAttributes))

    const [options] = result.current

    const option = options.find(option => option.type === 'item' && option.name === mode) as ToolbarItemOption

    option.onAction?.('key')

    expect(updateEmbedBlockAttributes).toBeCalledWith({ mode: 'preview' }, blockType)
  })

  it('triggers bookmark view correctly', () => {
    const blockType = 'attachment'
    const mode = 'bookmark'
    const updateEmbedBlockAttributes = jest.fn()
    const { result } = renderHook(() => useModeSwitchOptions(mode, blockType, updateEmbedBlockAttributes))

    const [options] = result.current

    const option = options.find(option => option.type === 'item' && option.name === mode) as ToolbarItemOption

    option.onAction?.('key')

    expect(updateEmbedBlockAttributes).toBeCalledWith({ mode }, blockType)
  })

  it('triggers text view correctly', () => {
    const blockType = 'attachment'
    const mode = 'text'
    const updateEmbedBlockAttributes = jest.fn()
    const { result } = renderHook(() => useModeSwitchOptions(mode, blockType, updateEmbedBlockAttributes))

    const [options] = result.current

    const option = options.find(option => option.type === 'item' && option.name === mode) as ToolbarItemOption

    option.onAction?.('key')

    expect(updateEmbedBlockAttributes).toBeCalledWith({ mode: 'link' }, blockType)
  })
})
