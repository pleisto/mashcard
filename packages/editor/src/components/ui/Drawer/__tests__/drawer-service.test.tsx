/* eslint-disable max-nested-callbacks */
import { act, Renderer, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import { FC, ReactNode } from 'react'
import { useDrawer, useDrawerService } from '..'
import { UseDrawerReturn } from '../drawer-service'
import { DrawerView, useDrawerStore } from '../drawer-service/store'

describe('useDrawerService', () => {
  it('should attach the service when called and detach when unmounted', () => {
    const { unmount } = renderHook(() => useDrawerService())
    const { result, rerender: rerenderStore } = renderHook(() => useDrawerStore(store => store.isAttached))
    expect(result.current).toBe(true)
    unmount()
    rerenderStore()
    expect(result.current).toBe(false)
  })
})

describe('useDrawer', () => {
  const Wrapper: FC<{ children?: ReactNode }> = ({ children }) => {
    useDrawerService()
    return <>{children}</>
  }

  describe('for a built-in drawer view', () => {
    const view: DrawerView = 'explorerMenu'
    let renderedHook: RenderHookResult<{}, UseDrawerReturn, Renderer<{}>>
    beforeEach(() => {
      renderedHook = renderHook(() => useDrawer(view), {
        wrapper: Wrapper
      })
    })
    it('should be invisible when a drawer is initially invoked', () => {
      const { result } = renderedHook
      expect(result.current.visible).toBe(false)
    })

    it('should be visible when `open` is called and invisible again when `close` is called', () => {
      const { result, rerender } = renderedHook
      act(() => result.current.open())
      rerender()
      expect(result.current.visible).toBe(true)
      act(() => result.current.close())
      rerender()
      expect(result.current.visible).toBe(false)
    })

    it('should set visible by `setVisible()`', () => {
      const { result, rerender } = renderedHook
      act(() => result.current.setVisible(true))
      rerender()
      expect(result.current.visible).toBe(true)
      act(() => result.current.setVisible(false))
      rerender()
      expect(result.current.visible).toBe(false)
    })
  })

  describe('for a customer drawer view', () => {
    it('should accept an abitrary string as the name of custom view and can be opened by this view name', () => {
      const { result, rerender } = renderHook(() => useDrawer('custom'), { wrapper: Wrapper })
      act(() => result.current.open())
      rerender()
      expect(result.current.visible).toBe(true)
      const { result: storeResult } = renderHook(() => useDrawerStore())
      expect(storeResult.current.state).toBe('custom')
    })
  })

  describe('failures', () => {
    it('should throw an error when trying to use a drawer without attaching the service first', () => {
      const { result } = renderHook(() => useDrawer('discussionList'))
      expect(() => result.current.open()).toThrow()
    })
  })
})
