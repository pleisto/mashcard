import { act, renderHook } from '@testing-library/react-hooks'
import { useUnsplashImages } from '../../../embedTypes/Gallery/useUnsplashImages'
import * as hooks from '../../../../../../hooks/useEditorPropsContext'
import { useRef } from 'react'
import { EditorPropsContext } from '../../../../../../context'

jest.useRealTimers()

describe('useUnsplashImages', () => {
  it('fetches images correctly', async () => {
    const editorPropsContext = { ...EditorPropsContext }
    editorPropsContext.fetchUnsplashImages = async () => {
      return {
        success: true,
        data: [
          {
            id: 'id',
            smallUrl: 'smallUrl',
            fullUrl: 'fullUrl',
            username: 'username',
            width: 100,
            height: 100
          }
        ]
      }
    }

    jest.spyOn(hooks, 'useEditorPropsContext').mockImplementation(() => editorPropsContext)
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn()
    })) as any

    await act(async () => {
      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(document.createElement('div'))
        return useUnsplashImages(ref)
      })

      // wait for async effect
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 10)
      })

      const [images] = result.current

      expect(images).toHaveLength(1)
    })
  })

  it('fetches images correctly when observer triggers', async () => {
    const editorPropsContext = { ...EditorPropsContext }
    editorPropsContext.fetchUnsplashImages = async () => {
      return {
        success: true,
        data: [
          {
            id: 'id',
            smallUrl: 'smallUrl',
            fullUrl: 'fullUrl',
            username: 'username',
            width: 100,
            height: 100
          }
        ]
      }
    }

    jest.spyOn(hooks, 'useEditorPropsContext').mockImplementation(() => editorPropsContext)
    window.IntersectionObserver = class IntersectionObserver {
      cb: any

      constructor(cb: (param: any) => void) {
        // eslint-disable-next-line node/no-callback-literal
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

    await act(async () => {
      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(document.createElement('div'))
        return useUnsplashImages(ref)
      })

      // wait for async effect
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 10)
      })

      const [images] = result.current

      expect(images).toHaveLength(1)
    })
  })

  it('fetches images by query correctly', async () => {
    const editorPropsContext = { ...EditorPropsContext }
    editorPropsContext.fetchUnsplashImages = async () => {
      return {
        success: true,
        data: [
          {
            id: 'id',
            smallUrl: 'smallUrl',
            fullUrl: 'fullUrl',
            username: 'username',
            width: 100,
            height: 100
          }
        ]
      }
    }

    jest.spyOn(hooks, 'useEditorPropsContext').mockImplementation(() => editorPropsContext)
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn()
    })) as any

    await act(async () => {
      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(document.createElement('div'))
        return useUnsplashImages(ref)
      })

      const [, , search] = result.current

      // wait for async effect
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 10)
      })

      search({ target: { value: 'cat' } } as any)

      // wait for debounce
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 500)
      })

      const [images] = result.current

      expect(images).toHaveLength(1)
    })
  })
})
