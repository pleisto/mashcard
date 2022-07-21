import { act, renderHook } from '@testing-library/react'
import { EmbedAttributes, EmbedOptions } from '../../../../../../extensions'
import { mockBlockViewProps } from '../../../../../../test'
import { useImageState } from '../../../embedViews/ImageView/useImageState'

describe('useImageState', () => {
  it('triggers previewImage correctly', () => {
    const displayName = 'displayName'
    const url = 'url'
    const { node } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        attrs: {
          image: {
            key: 'key'
          }
        }
      }
    })
    const updateEmbedBlockAttributes = jest.fn()
    const props: any = { displayName, url, downloadUrl: url, node, updateEmbedBlockAttributes }
    const { result } = renderHook(() => useImageState(props))

    const { onImageLoad } = result.current

    // make image loaded
    const image = { naturalWidth: 1, naturalHeight: 1 }
    const event: any = { target: image }
    act(() => {
      onImageLoad(event)
    })

    expect(result.current.showPreview).toBeFalsy()

    act(() => {
      result.current.previewImage()
    })

    expect(result.current.showPreview).toBeTruthy()
  })

  it('not triggers previewImage if no key', () => {
    const displayName = 'displayName'
    const url = 'url'
    const { node } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        attrs: {
          image: {}
        }
      }
    })
    const props: any = { displayName, url, downloadUrl: url, node }
    const { result } = renderHook(() => useImageState(props))

    const { previewImage } = result.current

    previewImage()

    expect(result.current.showPreview).toBeFalsy()
  })

  it(`updates image's ratio normally when image loaded`, () => {
    const displayName = 'displayName'
    const url = 'url'
    const width = 10
    const height = 10
    const updateEmbedBlockAttributes = jest.fn()
    const { node } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        attrs: {
          image: {}
        }
      }
    })
    const props: any = { displayName, url, downloadUrl: url, node, updateEmbedBlockAttributes }
    const { result } = renderHook(() => useImageState(props))

    const { onImageLoad } = result.current

    expect(result.current.loaded).toBeFalsy()

    const image = { naturalWidth: width, naturalHeight: height }
    const event: any = { target: image }
    act(() => {
      onImageLoad(event)
    })

    expect(result.current.loaded).toBeTruthy()
    expect(updateEmbedBlockAttributes).toBeCalledWith({ width, ratio: width / height }, 'image')
  })

  it('zooms image in correctly', () => {
    const displayName = 'displayName'
    const url = 'url'
    const d = 50
    const width = 50
    const { node } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        attrs: {
          image: { width }
        }
      }
    })
    const updateEmbedBlockAttributes = jest.fn()
    const props: any = { displayName, url, downloadUrl: url, node, updateEmbedBlockAttributes }
    const { result } = renderHook(() => useImageState(props))

    const { zoomInImage } = result.current

    zoomInImage()

    expect(updateEmbedBlockAttributes).toBeCalledWith({ width: width + d }, 'image')
  })

  it('zooms image out correctly', () => {
    const displayName = 'displayName'
    const url = 'url'
    const d = 50
    const width = 250
    const { node } = mockBlockViewProps<EmbedOptions, EmbedAttributes>({
      node: {
        attrs: {
          image: { width }
        }
      }
    })
    const updateEmbedBlockAttributes = jest.fn()
    const props: any = { displayName, url, downloadUrl: url, node, updateEmbedBlockAttributes }
    const { result } = renderHook(() => useImageState(props))

    const { zoomOutImage } = result.current

    zoomOutImage()

    expect(updateEmbedBlockAttributes).toBeCalledWith({ width: width - d }, 'image')
  })
})
