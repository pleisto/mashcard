import { Node } from 'prosemirror-model'
import { JSONContent } from '@tiptap/core'
import { BlockInput, Block } from '@/BrickdocGraphQL'
import { isNil } from 'lodash-es'

export const nodeChildren = (node: Node): Node[] => (node.content as any)?.content ?? []

export const SIZE_GAP = 2 ** 32

const INLINE_TYPES = ['formulaBlock']

export const withoutUUID = (content: JSONContent[] | undefined): JSONContent[] => {
  if (!content) {
    return []
  }
  return content.map(i => {
    const isInline = INLINE_TYPES.includes(i.type!)
    const originalAttrs = i.attrs ?? {}
    const { uuid, sort, seq, ...attrs } = originalAttrs
    const result = { ...i, attrs: isInline ? originalAttrs : attrs }
    if (i.content) {
      return { ...result, content: withoutUUID(i.content) }
    } else {
      return result
    }
  })
}

// https://prosemirror.net/docs/ref/#model.Node
export const nodeToBlock = (node: Node, level: number): BlockInput[] => {
  const { uuid, sort, seq, data, ...rest } = node.attrs

  // TODO check if has child
  const childrenNodes = nodeChildren(node)
  const hasChildren =
    level === 0 ||
    (node.type.name === 'paragraph' &&
      childrenNodes &&
      childrenNodes.length &&
      nodeChildren(node)[0].type.name === 'paragraph')

  const text = rest.title ?? (level === 0 ? '' : node.textContent)

  const content: JSONContent[] = hasChildren ? [] : withoutUUID((node.toJSON() as JSONContent).content)

  if (!uuid) {
    throw new Error('No uuid found')
  }

  const parent: BlockInput = {
    content,
    text,
    id: uuid,
    sort: level === 0 ? sort || 0 : sort,
    type: node.type.name,
    meta: rest,
    data: data || {}
  }

  // const childrenNodes: Node[] = hasChildren ? nodeChildren(node) : []
  // NOTE collect sort and compact
  // NOTE exclude '0' / 0 / null / undefined / duplicated
  const sorts: Array<number | null> = childrenNodes
    .map((node: Node) => {
      return isNil(node.attrs?.sort) ? null : Number(node.attrs?.sort)
    })
    .map((sort: number | null, index: number, sorts: Array<number | null>) => {
      return sort === null || sorts.slice(0, index).includes(sort) ? null : sort
    })

  // Sorts result
  let finalSorts: number[]

  // Rebalance sorts
  if (sorts.every((sort: number | null) => !isNil(sort))) {
    // All valid
    finalSorts = (sorts as number[]).sort((a, b) => a - b)
  } else if (sorts.every((sort: number | null) => isNil(sort))) {
    // All empty
    finalSorts = sorts.map((_sort, index: number) => index * SIZE_GAP)
  } else {
    finalSorts = sorts
      .map((sort: number | null, index: number, realtimeSorts: Array<number | null>) => {
        let newSort: number
        if (isNil(sort)) {
          // Find next non nil value
          const afterNonNilIndex = realtimeSorts.findIndex((s: number | null, i: number) => !isNil(s) && i > index)
          const beforeNonNilIndexReverse = [...realtimeSorts]
            .reverse()
            .findIndex((s: number | null, i: number) => !isNil(s) && i > realtimeSorts.length - 1 - index)
          const beforeNonNilIndex =
            beforeNonNilIndexReverse === -1 ? -1 : realtimeSorts.length - 1 - beforeNonNilIndexReverse

          const afterSort = realtimeSorts[afterNonNilIndex]
          const beforeSort = realtimeSorts[beforeNonNilIndex]
          if (isNil(beforeSort)) {
            // first start
            if (isNil(afterSort)) {
              console.error('After sort is nil!', {
                realtimeSorts,
                index,
                afterNonNilIndex,
                beforeNonNilIndex,
                afterSort,
                beforeSort,
                length: realtimeSorts.length
              })
            }
            newSort = (afterSort as number) - afterNonNilIndex * SIZE_GAP
          } else if (isNil(afterSort)) {
            newSort = beforeSort + (realtimeSorts.length - 1 - beforeNonNilIndex) * SIZE_GAP
          } else {
            newSort = beforeSort + Math.round((afterSort - beforeSort) / (afterNonNilIndex - beforeNonNilIndex))
          }
        } else {
          newSort = sort
        }

        realtimeSorts[index] = newSort
        return newSort
      })
      .sort((a, b) => a - b)
  }

  const children = childrenNodes
    .filter((n: Node) => n.attrs.uuid && (level === 0 || n.type.name !== 'paragraph' || n.content.size))
    .flatMap((n: Node, i: number) => {
      n.attrs.sort = finalSorts[i]
      return nodeToBlock(n, level + 1).map((i: BlockInput) => ({ parentId: parent.id, ...i }))
    })

  return [parent, ...children]
}

export const blockToNode = (block: Block): JSONContent => {
  // const data = block.data
  const attrs: JSONContent['attrs'] = { ...block.meta }

  // NOTE patch UPDATE
  if (block.id) {
    attrs.uuid = block.id
  }

  // NOTE patch UPDATE
  if (block.sort !== undefined) {
    attrs.sort = block.sort
  }

  if (block.data) {
    attrs.data = block.data
  }

  const result: JSONContent = {
    type: block.type,
    attrs
  }

  if (block?.content?.length) {
    result.content = block.content
  }

  return result
}

export const blocksToJSONContents = (blocks: Block[], filterId?: string): JSONContent[] =>
  blocks
    .filter(
      block => block.parentId === filterId || ((isNil(block.parentId) || block.rootId === block.id) && isNil(filterId))
    )
    .sort((a, b) => Number(a.sort) - Number(b.sort))
    .map(block => ({ content: blocksToJSONContents(blocks, block.id), ...blockToNode(block) }))
