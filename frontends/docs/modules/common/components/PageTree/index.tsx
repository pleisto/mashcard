import React from 'react'
import { useGetPageBlocksQuery, useBlockMoveMutation, BlockMoveInput, BlockData, Block, Blocktype, BlockEmoji } from '@/BrickdocGraphQL'
import { Skeleton, Tree, TreeProps } from '@brickdoc/design-system'
import { array2Tree } from '@/utils'
import { PageMenu } from '../PageMenu'
import { SIZE_GAP } from '@/docs/modules/pages/SyncProvider'

interface PageTreeProps {
  webid: string
}

export const PageTree: React.FC<PageTreeProps> = ({ webid }) => {
  const { data, loading, refetch } = useGetPageBlocksQuery({ variables: { webid } })
  const [blockMove, { loading: moveLoading }] = useBlockMoveMutation()

  if (loading || moveLoading || !data?.pageBlocks) {
    return <Skeleton />
  }

  const getTitle = (block: Block): string => {
    const emoji = block.meta.icon?.type === Blocktype.Emoji ? (block.meta.icon as BlockEmoji).emoji : ''
    const text = block.data.text
    if (emoji) {
      return `${emoji} ${text}`
    } else {
      return text
    }
  }

  const flattedData = data.pageBlocks
    .map(i => {
      const data: BlockData = i.data
      const title = getTitle(i as Block)
      return {
        key: i.id,
        value: i.id,
        parentId: i.parentId,
        type: i.type,
        sort: i.sort,
        nextSort: i.nextSort,
        firstChildSort: i.firstChildSort,
        titleText: title,
        title: <PageMenu id={i.id} text={data.text} parentId={i.parentId ?? null} title={title} webid={webid} />
      }
    })
    .sort((a, b) => Number(a.sort) - Number(b.sort))

  const onDrop: TreeProps['onDrop'] = async (attrs): Promise<void> => {
    let targetParentId: string | undefined | null, sort: number

    const node = attrs.node as unknown as Block & { key: string }
    // Check if is root node
    if (attrs.dropToGap) {
      targetParentId = node.parentId
      // take averaged value
      if (attrs.dropPosition === -1) {
        sort = Math.round(2 * (Number(node.sort) - Number(node.nextSort)))
      } else {
        sort = Math.round(0.5 * (Number(node.sort) + Number(node.nextSort)))
      }
    } else {
      targetParentId = node.key
      // take next value
      sort = Number(node.firstChildSort) - SIZE_GAP
    }
    const input: BlockMoveInput = { id: attrs.dragNode.key as string, sort }
    if (targetParentId) {
      input.targetParentId = targetParentId
    }
    // console.log({ input, attrs })
    await blockMove({ variables: { input } })
    void refetch()
  }

  const compactedData = flattedData.filter(i => {
    // NOTE hide if is NEWLINE (which type == paragraph and title is blank)
    return i.type !== 'paragraph' || !!i.titleText
  })

  const treeData = array2Tree(compactedData, { id: 'key' })

  return <Tree treeData={treeData} defaultExpandAll draggable onDrop={onDrop} />
}
