import { renderHook } from '@testing-library/react-hooks'
import { mockBlockViewProps } from '../../../../../../test'
import { useImageState } from '../../../embedViews/ImageView/useImageState'

describe('useImageState', () => {
  it('triggers previewImage correctly', () => {
    const displayName = 'displayName'
    const url = 'url'
    const { node } = mockBlockViewProps()
    const props: any = { displayName, url, node }
    const { result } = renderHook(() => useImageState(props))

    const { previewImage } = result.current

    expect(result.current.showPreview).toBeFalsy()

    previewImage()

    expect(result.current.showPreview).toBeTruthy()
  })

  it(`updates image's ratio normally when image loaded`, () => {
    const displayName = 'displayName'
    const url = 'url'
    const width = 10
    const height = 10
    const updateEmbedBlockAttributes = jest.fn()
    const { node } = mockBlockViewProps()
    const props: any = { displayName, url, node, updateEmbedBlockAttributes }
    const { result } = renderHook(() => useImageState(props))

    const { onImageLoad } = result.current

    expect(result.current.loaded).toBeFalsy()

    const image = { naturalWidth: width, naturalHeight: height }
    const event: any = { target: image }
    onImageLoad(event)

    expect(result.current.loaded).toBeTruthy()
    expect(updateEmbedBlockAttributes).toBeCalledWith({ width, ratio: width / height }, 'image')
  })
})
