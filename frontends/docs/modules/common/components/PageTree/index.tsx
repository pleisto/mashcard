import React from 'react'
import { useGetPageBlocksQuery, useBlockMoveMutation, BlockMoveInput, Block, Blocktype, BlockEmoji } from '@/BrickdocGraphQL'
import { Skeleton, Tree, TreeProps } from '@brickdoc/design-system'
import { array2Tree } from '@/utils'
import { PageMenu } from '../PageMenu'
import { SIZE_GAP } from '@/docs/modules/pages/useSyncProvider'
import { queryPageBlocks } from '../../graphql'
import styles from './PageTree.module.css'

interface PageTreeProps {
  webid: string
}

export const PageTree: React.FC<PageTreeProps> = ({ webid }) => {
  const { data } = useGetPageBlocksQuery({ variables: { webid } })
  const [blockMove] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })

  if (!data?.pageBlocks) {
    return <Skeleton />
  }

  const getTitle = (block: Block): string => {
    const emoji = block.meta.icon?.type === Blocktype.Emoji ? (block.meta.icon as BlockEmoji).emoji : ''
    const text = block.text
    if (emoji) {
      return `${emoji} ${text}`
    } else if (/^\s*$/.test(text)) {
      return 'Untitled'
    } else {
      return text
    }
  }

  const flattedData = data.pageBlocks
    .map(b => {
      // const data: BlockData = i.data
      const title = getTitle(b as Block)
      return {
        key: b.id,
        value: b.id,
        parentId: b.parentId,
        type: b.type,
        sort: b.sort,
        nextSort: b.nextSort,
        firstChildSort: b.firstChildSort,
        titleText: title,
        title: <PageMenu id={b.id} title={title} webid={webid} />
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
    await blockMove({ variables: { input } })
  }

  const treeData = array2Tree(flattedData, { id: 'key' })

  return <Tree className={styles.tree} treeData={treeData} defaultExpandAll draggable onDrop={onDrop} />
}
