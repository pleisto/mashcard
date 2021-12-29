import { initialTocTree } from '../tocTree'

const buildDoc = (nodes: any[]): any => {
  return {
    descendants: (predicate: Function) => {
      nodes.forEach((node, index) => predicate(node, index))
    }
  }
}

describe('tocTree', () => {
  it('creates an empty toc tree correctly', () => {
    const nodes: any[] = []
    const doc = buildDoc(nodes)

    const [tree, count] = initialTocTree(doc)

    expect(count).toBe(nodes.length)
    expect(tree.item.level).toBe('root')
    expect(tree.children).toHaveLength(0)
  })

  it('create normally toc tree correctly', () => {
    const h1 = ['h1', 'h1`', 'h1``']
    const h2 = ['h2']
    const h3 = ['h3']
    const h4 = ['h4']
    const h5 = ['h5', 'h5`']
    const anchor = ['anchor']
    const nodes: any[] = [
      // includes a non-toc node
      {
        type: {
          name: 'others'
        },
        marks: [
          {
            type: {
              name: 'others'
            }
          }
        ]
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h1[0],
        attrs: {
          level: 1
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h2[0],
        attrs: {
          level: 2
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h5[1],
        attrs: {
          level: 5
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h1[1],
        attrs: {
          level: 1
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h3[0],
        attrs: {
          level: 3
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h4[0],
        attrs: {
          level: 4
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h5[0],
        attrs: {
          level: 5
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h2[1],
        attrs: {
          level: 2
        },
        nodeSize: 1
      },
      {
        type: {
          name: 'text'
        },
        textContent: anchor[0],
        marks: [
          {
            type: {
              name: 'anchor'
            }
          }
        ],
        nodeSize: 1
      },
      {
        type: {
          name: 'heading'
        },
        textContent: h1[2],
        attrs: {
          level: 1
        },
        nodeSize: 1
      }
    ]
    const doc = buildDoc(nodes)

    const [tree, count] = initialTocTree(doc)

    expect(count).toBe(nodes.length - 1)
    expect(tree.children.map(item => item.item.level)).toEqual([1, 1, 1])
    expect(tree.children.map(item => item.item.text)).toEqual(h1)
    expect(tree).toMatchSnapshot()
  })
})
