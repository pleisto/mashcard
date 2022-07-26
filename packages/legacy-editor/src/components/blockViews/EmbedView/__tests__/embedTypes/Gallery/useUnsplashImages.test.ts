import { renderHook, waitFor } from '@testing-library/react'
import { useUnsplashImages } from '../../../embedTypes/Gallery/useUnsplashImages'
import { useRef } from 'react'

describe('useUnsplashImages', () => {
  it('fetches images correctly', async () => {
    const extension: any = {
      options: {
        getGalleryImages: async () => {
          return {
            success: true,
            data: [
              {
                id: 'id',
                smallUrl: 'smallUrl',
                fullUrl: 'fullUrl',
                username: 'username',
                width: 100,
                height: 100,
                blurHash: 'LRE3@]RkxYV@00t7IVt7nNoL%2WV'
              }
            ]
          }
        }
      }
    }

    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn()
    })) as any

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useUnsplashImages(ref, extension)
    })

    await waitFor(() => {
      const [images] = result.current
      expect(images).toHaveLength(1)
    })
  })

  it('fetches images correctly when observer triggers', async () => {
    const extension: any = {
      options: {
        getGalleryImages: jest.fn(async () => {
          return {
            success: true,
            data: [
              {
                id: 'id',
                smallUrl: 'smallUrl',
                fullUrl: 'fullUrl',
                username: 'username',
                width: 100,
                height: 100,
                blurHash: 'LRE3@]RkxYV@00t7IVt7nNoL%2WV'
              }
            ]
          }
        })
      }
    }

    window.IntersectionObserver = class IntersectionObserver {
      cb: any

      constructor(cb: (param: any) => void) {
        this.cb = cb
        this.check(1)
      }

      check(y: number): void {
        this.cb([{ boundingClientRect: { y } }])
      }

      observe(): void {
        this.check(0)
      }

      unobserve(): void {}
    } as any

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useUnsplashImages(ref, extension)
    })

    await waitFor(() => {
      expect(extension.options.getGalleryImages).toBeCalledTimes(2)
    })
  })

  it('fetches images by query correctly', async () => {
    const extension: any = {
      options: {
        getGalleryImages: jest.fn(async () => {
          return {
            success: true,
            data: [
              {
                id: 'id',
                smallUrl: 'smallUrl',
                fullUrl: 'fullUrl',
                username: 'username',
                width: 100,
                height: 100,
                blurHash: 'LRE3@]RkxYV@00t7IVt7nNoL%2WV'
              }
            ]
          }
        })
      }
    }

    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn()
    })) as any

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useUnsplashImages(ref, extension)
    })

    const [, , search] = result.current

    search({ target: { value: 'cat' } } as any)

    await waitFor(() => {
      expect(extension.options.getGalleryImages).toBeCalledTimes(2)
    })
  })
})
