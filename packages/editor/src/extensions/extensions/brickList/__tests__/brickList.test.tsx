import { renderHook } from '@testing-library/react'
import { useTestEditor } from '../../../../test/testEditor'
import { BulletList } from '../../../blocks'
import { BrickList } from '../brickList'

describe('brickList', () => {
  it('triggers wrapInBrickList correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, BrickList]
      })
    )

    const editor = result.current

    // TODO: make test more useful
    expect(() => {
      editor?.commands.wrapInBrickList('bulletList')
    }).not.toThrow()
  })

  it('triggers toggleBrickList correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, BrickList]
      })
    )

    const editor = result.current

    // TODO: make test more useful
    expect(() => {
      editor?.commands.toggleBrickList('bulletList')
    }).not.toThrow()
  })

  it('triggers setToBrickList correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, BrickList]
      })
    )

    const editor = result.current

    // TODO: make test more useful
    expect(() => {
      editor?.commands.setToBrickList('bulletList')
    }).not.toThrow()
  })

  it('triggers joinBackward correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, BrickList]
      })
    )

    const editor = result.current

    // TODO: make test more useful
    expect(() => {
      editor?.commands.joinBackward()
    }).not.toThrow()
  })

  it('triggers liftEmptyBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, BrickList]
      })
    )

    const editor = result.current

    // TODO: make test more useful
    expect(() => {
      editor?.commands.liftEmptyBlock()
    }).not.toThrow()
  })

  it('triggers liftBrickList correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, BrickList]
      })
    )

    const editor = result.current

    // TODO: make test more useful
    expect(() => {
      editor?.commands.liftBrickList()
    }).not.toThrow()
  })
})
