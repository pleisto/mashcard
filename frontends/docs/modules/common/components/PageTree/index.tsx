import React from 'react'
import { useGetPageBlocksQuery, useBlockMoveMutation, BlockMoveInput, BlockData, Block } from '@/BrickdocGraphQL'
import { Skeleton, Tree, TreeProps } from '@brickdoc/design-system'
import { array2Tree } from '@/utils'
import { PageMenu } from '../PageMenu'

interface PageTreeProps {
  webid: string
}

export const PageTree: React.FC<PageTreeProps> = ({ webid }) => {
  const { data, loading, refetch } = useGetPageBlocksQuery({ variables: { webid } })
  const [blockMove, { loading: moveLoading }] = useBlockMoveMutation()

  if (loading || moveLoading || !data?.pageBlocks) {
    return <Skeleton />
  }

  const flattedData = data.pageBlocks
    .map(i => {
      const data: BlockData = i.data
      const title = data.text.slice(0, 20)
      return {
        key: i.id,
        value: i.id,
        parentId: i.parentId,
        type: i.type,
        sort: i.sort,
        nextSort: i.nextSort,
        titleText: title,
        title: <PageMenu id={i.id} text={data.text} parentId={i.parentId ?? null} title={title} webid={webid} />
      }
    })
    .sort((a, b) => Number(a.sort) - Number(b.sort))

  const onDrop: TreeProps['onDrop'] = async (attrs): Promise<void> => {
    // TODO check dropToGap
    // TODO empty targetParentId support
    console.log(attrs)
    let targetParentId: string, sort: number

    const node = attrs.node as unknown as Block & { key: string }
    // Check if is root node
    if (node.parentId) {
      targetParentId = node.parentId
      // take averaged value
      sort = Math.round(0.5 * (Number(node.sort) + Number(node.nextSort)))
    } else {
      targetParentId = node.key
      // take next value
      sort = Number(node.nextSort)
    }
    const input: BlockMoveInput = { id: attrs.dragNode.key as string, targetParentId, sort }
    console.log({ input })
    await blockMove({ variables: { input } })
    void refetch()
  }

  const compactedData = flattedData.filter(i => {
    // NOTE check if is NEWLINE (which type == paragraph and title is blank)
    return i.type !== 'paragraph' || !!i.titleText
  })

  const treeData = array2Tree(compactedData, { id: 'key' })

  return <Tree treeData={treeData} defaultExpandAll draggable onDrop={onDrop} />
}
