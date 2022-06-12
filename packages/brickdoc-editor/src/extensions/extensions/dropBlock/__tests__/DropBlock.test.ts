import { BlockDropAdd, BrickdocEventBus } from '@brickdoc/schema'
import { renderHook } from '@testing-library/react-hooks'
import { useTestEditor } from '../../../../test/testEditor'
import { DropBlock, DropBlockView } from '../dropBlock'

describe('DropBlock', () => {
  it('triggers drop event correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [DropBlock]
      })
    )

    const editor = result.current

    let subscribed = false

    BrickdocEventBus.subscribe(BlockDropAdd, () => {
      subscribed = true
    })

    editor!.view.posAtCoords = () => ({ pos: 1, inside: 1 })

    const view = new DropBlockView(editor!.view)
    const event: any = {
      dataTransfer: {
        getData: () => 'key',
        clientX: 1,
        clientY: 1
      },
      preventDefault: () => {}
    }

    view.drop(event)

    expect(subscribed).toBeTruthy()
  })

  it('triggers dragover correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [DropBlock]
      })
    )

    const editor = result.current

    const view = new DropBlockView(editor!.view)
    const event: any = {
      preventDefault: jest.fn()
    }

    view.dragover(event)

    expect(event.preventDefault).toBeCalled()
  })

  it('triggers destroy correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [DropBlock]
      })
    )

    const editor = result.current

    editor!.view.dom.removeEventListener = jest.fn()

    const view = new DropBlockView(editor!.view)

    view.destroy()

    expect(editor?.view.dom.removeEventListener).toBeCalledTimes(2)
  })
})
