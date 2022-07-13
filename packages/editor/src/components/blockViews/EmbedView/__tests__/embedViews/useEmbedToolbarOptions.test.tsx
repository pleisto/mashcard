import { render, renderHook, act } from '@testing-library/react'
import { ToolbarGroupOption, ToolbarItemGroupOption, ToolbarItemOption } from '../../../../ui'
import { EditPanel, useDisplayName, useEmbedToolbarOptions } from '../../embedViews/useEmbedToolbarOptions'

describe('useEmbedToolbarOptions', () => {
  it('triggers card view correctly', () => {
    const blockType = 'attachment'
    const mode = 'card'
    const updateEmbedBlockAttributes = jest.fn()
    const displayName = 'displayName'
    const url = 'url'
    const { result } = renderHook(() =>
      useEmbedToolbarOptions({ mode, blockType, displayName, url, updateEmbedBlockAttributes })
    )

    const [options] = result.current

    const option = (options[0] as ToolbarGroupOption).items.find(
      option => option.type === 'item' && option.name === mode
    ) as ToolbarItemOption

    option.onAction?.('key')

    expect(updateEmbedBlockAttributes).toBeCalledWith({ mode: 'card' }, blockType)
  })

  it('triggers preview view correctly', () => {
    const blockType = 'attachment'
    const mode = 'preview'
    const displayName = 'displayName'
    const url = 'url'
    const updateEmbedBlockAttributes = jest.fn()
    const { result } = renderHook(() =>
      useEmbedToolbarOptions({ mode, blockType, displayName, url, updateEmbedBlockAttributes })
    )

    const [options] = result.current

    const option = (options[0] as ToolbarGroupOption).items.find(
      option => option.type === 'item' && option.name === mode
    ) as ToolbarItemOption

    option.onAction?.('key')

    expect(updateEmbedBlockAttributes).toBeCalledWith({ mode }, blockType)
  })

  it('triggers text view correctly', () => {
    const blockType = 'attachment'
    const mode = 'text'
    const displayName = 'displayName'
    const url = 'url'
    const updateEmbedBlockAttributes = jest.fn()
    const { result } = renderHook(() =>
      useEmbedToolbarOptions({ mode, blockType, displayName, url, updateEmbedBlockAttributes })
    )

    const [options] = result.current

    const option = (options[0] as ToolbarItemGroupOption).items.find(
      option => option.type === 'item' && option.name === mode
    ) as ToolbarItemOption

    option.onAction?.('key')

    expect(updateEmbedBlockAttributes).toBeCalledWith({ mode: 'text' }, blockType)
  })

  it('renders EditPanel correctly', () => {
    const blockType = 'attachment'
    const link = 'link'
    const displayName = 'displayName'
    const updateEmbedBlockAttributes = jest.fn()

    const { container } = render(
      <EditPanel
        blockType={blockType}
        link={link}
        displayName={displayName}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('updates displayName correctly', () => {
    const blockType = 'attachment'
    const displayName = 'displayName'
    const newDisplayName = 'newDisplayName'
    const updateEmbedBlockAttributes = jest.fn()

    const { result } = renderHook(() => useDisplayName(blockType, displayName, updateEmbedBlockAttributes))

    const [, onDisplayNameChange] = result.current

    act(() => {
      onDisplayNameChange({ target: { value: newDisplayName } } as any)
    })

    expect(result.current[0]).toEqual(newDisplayName)

    const [, , onDisplayNameSubmit] = result.current
    onDisplayNameSubmit()

    expect(updateEmbedBlockAttributes).toBeCalledWith({ displayName: newDisplayName }, blockType)
  })

  it('triggers full screen correctly', () => {
    const blockType = 'attachment'
    const mode = 'card'
    const updateEmbedBlockAttributes = jest.fn()
    const displayName = 'displayName'
    const url = 'url'
    const onFullScreen = jest.fn()
    const { result } = renderHook(() =>
      useEmbedToolbarOptions({ mode, blockType, displayName, url, updateEmbedBlockAttributes, onFullScreen })
    )

    const [options] = result.current

    const option = (options[2] as ToolbarGroupOption).items[0] as ToolbarItemOption

    option.onAction?.('key')

    expect(onFullScreen).toBeCalled()
  })

  it('triggers image align correctly', () => {
    const blockType = 'image'
    const mode = 'preview'
    const updateEmbedBlockAttributes = jest.fn()
    const displayName = 'displayName'
    const url = 'url'
    const { result } = renderHook(() =>
      useEmbedToolbarOptions({ mode, blockType, displayName, url, updateEmbedBlockAttributes })
    )

    const [options] = result.current

    const alignLeft = (options[1] as ToolbarGroupOption).items[0] as ToolbarItemOption
    alignLeft.onAction?.('key')
    expect(updateEmbedBlockAttributes).toBeCalledWith({ align: 'left' }, 'image')

    const alignCenter = (options[1] as ToolbarGroupOption).items[1] as ToolbarItemOption
    alignCenter.onAction?.('key')
    expect(updateEmbedBlockAttributes).toBeCalledWith({ align: 'center' }, 'image')

    const alignRight = (options[1] as ToolbarGroupOption).items[2] as ToolbarItemOption
    alignRight.onAction?.('key')
    expect(updateEmbedBlockAttributes).toBeCalledWith({ align: 'right' }, 'image')

    const alignFullWidth = (options[1] as ToolbarGroupOption).items[3] as ToolbarItemOption
    alignFullWidth.onAction?.('key')
    expect(updateEmbedBlockAttributes).toBeCalledWith({ align: 'full-width' }, 'image')
  })
})
