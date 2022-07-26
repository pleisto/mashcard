import { renderHook } from '@testing-library/react'
import { useDiscussionVisible } from '../../DiscussionList/useDiscussionVisible'
import { CommentedNode } from '../../useCommentedNodes'
import * as DrawerService from '../../../../ui/Drawer/drawer-service/useDrawer'

jest.mock('../../../../ui/Drawer/drawer-service/useDrawer', () => {
  const { useDrawer } = jest.requireActual('../../../../ui/Drawer/drawer-service/useDrawer')
  return { useDrawer: jest.fn().mockImplementation(useDrawer) }
})

describe('useDiscussionVisible', () => {
  it('not visible if not matched mark id in page query', () => {
    const commentedNode: CommentedNode[] = [
      {
        markId: '2'
      } as any
    ]
    const setActiveMarkId = jest.fn()
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => '1')
    const { result } = renderHook(() => useDiscussionVisible(commentedNode, setActiveMarkId))

    expect(result.current.visible).toBe(false)
  })

  it('make visible if mark id in page query matched', () => {
    const markId = 'markId'
    const commentedNode: CommentedNode[] = [
      {
        markId
      } as any
    ]
    const setActiveMarkId = jest.fn()
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => markId)
    jest.spyOn(DrawerService, 'useDrawer').mockImplementation(() => ({
      visible: false,
      setVisible: jest.fn(),
      open: jest.fn(),
      close: jest.fn()
    }))
    const { result } = renderHook(() => useDiscussionVisible(commentedNode, setActiveMarkId))

    jest.runAllTimers()

    expect(result.current.visible).toBe(false)
    expect(setActiveMarkId).toBeCalled()
  })
})
