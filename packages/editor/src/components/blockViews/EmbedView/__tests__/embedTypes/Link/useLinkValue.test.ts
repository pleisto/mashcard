import { renderHook, act } from '@testing-library/react'
import { useLinkValue } from '../../../embedTypes/Link/useLinkValue'

jest.mock('../../../embedTypes/Link/useWebsiteMetaProgress.ts', () => ({
  useWebsiteMetaProgress: () => [0, () => {}, () => {}]
}))

describe('useLinkValue', () => {
  it('triggers handleLinkChange correctly', () => {
    const updateEmbedBlockAttributes = jest.fn()
    const link = 'link'

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes))

    const [, handleLinkChange] = result.current

    act(() => handleLinkChange({ target: { value: link } } as any))

    expect(result.current[0]).toBe(link)
  })

  it('triggers handleLinkClear correctly', () => {
    const updateEmbedBlockAttributes = jest.fn()
    const link = 'link'

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes))

    const [, handleLinkChange, handleLinkClear] = result.current

    act(() => handleLinkChange({ target: { value: link } } as any))
    act(() => handleLinkClear())

    expect(result.current[0]).toBe('')
  })

  it('triggers handleSubmit correctly when link is empty', async () => {
    const updateEmbedBlockAttributes = jest.fn()

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes))

    const [, , , handleSubmit] = result.current

    await act(() => handleSubmit())

    expect(updateEmbedBlockAttributes).not.toBeCalled()
  })

  it('triggers handleSubmit correctly when fetch website meta failed', () => {
    const extension: any = {
      options: {
        getUrlData: async () =>
          await Promise.resolve({
            success: false,
            data: {
              title: 'title',
              url: 'url'
            }
          })
      }
    }
    const updateEmbedBlockAttributes = jest.fn()

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes, extension))

    const [, handleLinkChange] = result.current

    act(() => handleLinkChange({ target: { value: 'link' } } as any))

    const [, , , handleSubmit] = result.current

    handleSubmit()

    expect(updateEmbedBlockAttributes).not.toBeCalled()
  })

  it('triggers handleSubmit correctly when fetched website data', async () => {
    const extension: any = {
      options: {
        getUrlData: async () =>
          await Promise.resolve({
            success: true,
            data: {
              type: 'website',
              title: 'title',
              url: 'url'
            }
          })
      }
    }
    const updateEmbedBlockAttributes = jest.fn()

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes, extension))

    const [, handleLinkChange] = result.current

    act(() => handleLinkChange({ target: { value: 'link' } } as any))

    const [, , , handleSubmit] = result.current

    await act(() => handleSubmit())

    expect(updateEmbedBlockAttributes).toBeCalled()
    expect(updateEmbedBlockAttributes.mock.calls[0][1]).toBe('link')
  })

  it('triggers handleSubmit correctly when fetched image data', async () => {
    const extension: any = {
      options: {
        getUrlData: async () =>
          await Promise.resolve({
            success: true,
            data: {
              type: 'image',
              title: 'title',
              url: 'url'
            }
          })
      }
    }

    const updateEmbedBlockAttributes = jest.fn()

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes, extension))

    const [, handleLinkChange] = result.current

    act(() => handleLinkChange({ target: { value: 'link' } } as any))

    const [, , , handleSubmit] = result.current

    await act(() => handleSubmit())

    expect(updateEmbedBlockAttributes).toBeCalled()
    expect(updateEmbedBlockAttributes.mock.calls[0][1]).toBe('image')
  })

  it('triggers handleSubmit correctly when fetched attachment data', async () => {
    const extension: any = {
      options: {
        getUrlData: async () =>
          await Promise.resolve({
            success: true,
            data: {
              type: 'pdf',
              title: 'title',
              url: 'url'
            }
          })
      }
    }

    const updateEmbedBlockAttributes = jest.fn()

    const { result } = renderHook(() => useLinkValue(updateEmbedBlockAttributes, extension))

    const [, handleLinkChange] = result.current

    act(() => handleLinkChange({ target: { value: 'link' } } as any))

    const [, , , handleSubmit] = result.current

    await act(() => handleSubmit())

    expect(updateEmbedBlockAttributes).toBeCalled()
    expect(updateEmbedBlockAttributes.mock.calls[0][1]).toBe('attachment')
  })
})
