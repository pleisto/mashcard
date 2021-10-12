import React, { useState } from 'react'
import { useGetPageBlocksQuery, useBlockMoveMutation, BlockMoveInput, Block, Blocktype, BlockEmoji } from '@/BrickdocGraphQL'
import { Skeleton, Tree, TreeProps } from '@brickdoc/design-system'
import { array2Tree } from '@/utils'
import { PageMenu } from '../PageMenu'
import { SIZE_GAP } from '@/docs/pages/hooks/useSyncProvider'
import { queryPageBlocks } from '../../graphql'
import styles from './PageTree.module.less'
import { useDocsI18n } from '../../hooks'

interface PageTreeProps {
  webid: string
  docid: string | undefined
}

export const PageTree: React.FC<PageTreeProps> = ({ webid, docid }) => {
  const { data } = useGetPageBlocksQuery({ variables: { webid } })
  const [blockMove, { loading }] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })
  const [draggable, setDraggable] = useState<boolean>(true)
  const { t } = useDocsI18n()

  if (loading) {
    return <Skeleton active />
  }

  const pageBlocks = data?.pageBlocks ?? []

  const getTitle = (block: Block): string => {
    const emoji = block.meta.icon?.type === Blocktype.Emoji ? (block.meta.icon as BlockEmoji).emoji : ''
    const text = block.text
    if (emoji) {
      return `${emoji} ${text}`
    } else if (/^\s*$/.test(text)) {
      return t('title.untitled')
    } else {
      return text
    }
  }

  const flattedData = pageBlocks
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
    setDraggable(false)

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
    setDraggable(true)
  }

  const treeData = array2Tree(flattedData, { id: 'key' })
  const selectedKeys = docid ? [docid] : []

  return (
    <Tree className={styles.tree} selectedKeys={selectedKeys} treeData={treeData} defaultExpandAll draggable={draggable} onDrop={onDrop} />
  )
}
