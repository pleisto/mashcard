import { act, renderHook, RenderHookResult } from '@testing-library/react'
import { FC, ReactNode } from 'react'
import { FormulaMenuStore, useFormulaMenuStore } from '../useFormulaMenuState'

describe('useFormulaMenuState', () => {
  const Wrapper: FC<{ children?: ReactNode }> = ({ children }) => {
    useFormulaMenuStore()
    return <>{children}</>
  }

  let renderedHook: RenderHookResult<FormulaMenuStore, {}>
  beforeEach(() => {
    renderedHook = renderHook(() => useFormulaMenuStore(), {
      wrapper: Wrapper
    })
  })
  it('initial', () => {
    const { result } = renderedHook
    expect(result.current.state).toBe(null)
  })

  it('disable open', () => {
    const { result } = renderedHook
    const success1 = result.current.tryOpenMenu('foobar')
    expect(success1).toBe(true)
    const success2 = result.current.tryOpenMenu('foobar222')
    expect(success2).toBe(false)

    result.current.closeMenu()
    const success3 = result.current.tryOpenMenu('foobar222')
    expect(success3).toBe(true)
  })

  it('rerender', () => {
    const { result, rerender } = renderedHook
    act(() => {
      result.current.tryOpenMenu('foobar')
    })
    rerender()
    expect(result.current.state).toBe('foobar')
    act(() => {
      result.current.closeMenu()
    })
    rerender()
    expect(result.current.state).toBe(null)
  })
})
