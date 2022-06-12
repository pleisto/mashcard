import { NodeRelativeSpot, type TreeNode } from '../constants'
import { calculateRelativeSpot, flattenNodes, joinNodeIdsByPath } from '../helpers'

const tree: TreeNode[] = [
  { id: 'a', text: 'a' },
  {
    id: 'b',
    text: 'b',
    children: [
      { id: 'b.1', text: 'b.1' },
      { id: 'b.2', text: 'b.2' }
    ]
  }
]

describe('joinNodeIdsByPath', () => {
  describe('for top-level nodes', () => {
    it(`should add a top-level node id to an empty list`, () => {
      const list = joinNodeIdsByPath(tree, 'a', [])
      expect(list).toEqual(['a'])
    })
    it(`should add a top-level node id to an undefined list`, () => {
      const list = joinNodeIdsByPath(tree, 'a')
      expect(list).toEqual(['a'])
    })
    it(`should return the same list if the id is already included`, () => {
      const newList = joinNodeIdsByPath(tree, 'a', ['a'])
      expect(newList).toEqual(['a'])
    })
  })

  describe('for nested nodes', () => {
    it(`should add the id to the list along with all its parent ids`, () => {
      const list = joinNodeIdsByPath(tree, 'b.1')
      expect(list.sort()).toEqual(['b', 'b.1'])
    })
    it(`should add only the missing ids to the list of the node's path`, () => {
      const newList = joinNodeIdsByPath(tree, 'b.2', ['b', 'b.1'])
      expect(newList.sort()).toEqual(['b', 'b.1', 'b.2'])
    })
    it(`should return the same list if the id is already included`, () => {
      const newList = joinNodeIdsByPath(tree, 'b.1', ['a', 'b', 'b.1'])
      expect(newList.sort()).toEqual(['a', 'b', 'b.1'])
    })
  })

  it('should return an empty array if the existing array is empty and no new match', () => {
    const list = joinNodeIdsByPath(tree, 'c')
    expect(list).toEqual([])
  })
})

describe('calculateRelativeSpot', () => {
  const targetNode = document.createElement('div')
  const nodeHeight = 34
  // The thresholds below match those in the function implementation.
  // If tests fail, please check if the actual thresholds have been modified.
  const TOP_THRESHOLD = nodeHeight / 2 - 10
  const BOTTOM_THRESHOLD = nodeHeight / 2 + 10
  beforeEach(() => {
    jest.spyOn(global.HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          x: 0,
          y: 0,
          width: 100,
          height: 34,
          left: 0,
          right: 100,
          top: 0,
          bottom: 34
        } as any)
    )
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should be above the target node if the point is in the upper part', () => {
    const pos = calculateRelativeSpot({ x: 0, y: TOP_THRESHOLD }, targetNode)
    expect(pos).toBe(NodeRelativeSpot.Before)
  })
  it('should be below the target node if the point is in the lower part', () => {
    const pos = calculateRelativeSpot({ x: 0, y: BOTTOM_THRESHOLD }, targetNode)
    expect(pos).toBe(NodeRelativeSpot.After)
  })
  it('should be on the target node if the point is in-between the middle part', () => {
    let pos = calculateRelativeSpot({ x: 0, y: TOP_THRESHOLD + 1 }, targetNode)
    expect(pos).toBe(NodeRelativeSpot.AsChild)
    pos = calculateRelativeSpot({ x: 0, y: BOTTOM_THRESHOLD - 1 }, targetNode)
    expect(pos).toBe(NodeRelativeSpot.AsChild)
  })
  it('should return null if the point or the target node is empty', () => {
    let pos = calculateRelativeSpot(null, targetNode)
    expect(pos).toBeNull()
    pos = calculateRelativeSpot({ x: 0, y: 0 }, null)
    expect(pos).toBeNull()
  })
})

describe('flattenNodes', () => {
  it('should flatten a tree by the depth-first order', () => {
    expect(flattenNodes(tree).map(node => node.id)).toEqual(['a', 'b', 'b.1', 'b.2'])
  })
  it('should do nothing on a empty tree', () => {
    expect(flattenNodes([])).toEqual([])
  })
  it('should return a flattend tree as-is', () => {
    const t: TreeNode[] = [
      { id: '1', text: '1' },
      { id: '2', text: '2' }
    ]
    expect(flattenNodes(t)).toEqual(t)
  })
})
