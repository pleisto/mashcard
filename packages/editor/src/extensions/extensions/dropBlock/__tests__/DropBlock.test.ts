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

    editor!.view.posAtCoords = () => ({ pos: 1, inside: 1 })
    const setEmbedBlock = jest.fn()
    editor!.chain = () =>
      ({
        setEmbedBlock,
        run: jest.fn()
      } as any)

    const view = new DropBlockView(editor!, editor!.view)
    const event: any = {
      dataTransfer: {
        getData: () => 'embed',
        clientX: 1,
        clientY: 1
      },
      preventDefault: () => {}
    }

    view.drop(event)

    expect(setEmbedBlock).toBeCalled()
  })

  it('triggers dragover correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [DropBlock]
      })
    )

    const editor = result.current

    const view = new DropBlockView(editor!, editor!.view)
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

    const view = new DropBlockView(editor!, editor!.view)

    view.destroy()

    expect(editor?.view.dom.removeEventListener).toBeCalledTimes(2)
  })
})
