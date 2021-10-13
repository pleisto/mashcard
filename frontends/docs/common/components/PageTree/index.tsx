import React, { useState } from 'react'
import {
  useGetPageBlocksQuery,
  useBlockMoveMutation,
  BlockMoveInput,
  Block,
  Blocktype,
  BlockEmoji,
  useGetBlockPinsQuery,
  GetPageBlocksQuery
} from '@/BrickdocGraphQL'
import { Divider, Tree, TreeProps } from '@brickdoc/design-system'
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
  type BlockType = Exclude<Exclude<GetPageBlocksQuery['pageBlocks'], undefined>, null>[0]

  const { data } = useGetPageBlocksQuery({ variables: { webid } })

  const [blockMove] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })
  const [draggable, setDraggable] = useState<boolean>(true)
  const { t } = useDocsI18n()

  const { data: pinData } = useGetBlockPinsQuery()
  const pinIds = pinData?.blockPins?.map(pin => pin.blockId) ?? []

  const getTitle = (block: BlockType): string => {
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

  // TODO fix type
  const treeDataSkelecton = (blocks: BlockType[], enableMenu: boolean): any => {
    if (!blocks) {
      return []
    }
    const flattedData = blocks
      .map(b => {
        // const data: BlockData = i.data
        const title = getTitle(b)
        const pin = pinIds.includes(b.id)
        return {
          key: b.id,
          value: b.id,
          parentId: b.parentId,
          type: b.type,
          sort: b.sort,
          nextSort: b.nextSort,
          firstChildSort: b.firstChildSort,
          titleText: title,
          title: <PageMenu enableMenu={enableMenu} docid={docid} pin={pin} id={b.id} title={title} titleText={b.text} webid={webid} />
        }
      })
      .sort((a, b) => Number(a.sort) - Number(b.sort))
    const treeData = array2Tree(flattedData, { id: 'key' })
    return treeData
  }

  const pageBlocks = data?.pageBlocks ?? []
  // TODO filter pin blocks
  const pinBlocks = pageBlocks.filter(block => pinIds.includes(block.id))
  const pageTreeData = treeDataSkelecton(pageBlocks, true)
  const pinTreeData = treeDataSkelecton(pinBlocks, false)
  const selectedKeys = docid ? [docid] : []

  const pinTree = pinIds.length ? (
    <>
      Pin
      <Tree className={styles.tree} selectedKeys={selectedKeys} treeData={pinTreeData} defaultExpandAll draggable={false} />
      <Divider />
    </>
  ) : (
    <></>
  )

  return (
    <>
      {pinTree}
      Pages
      <Tree
        className={styles.tree}
        selectedKeys={selectedKeys}
        treeData={pageTreeData}
        defaultExpandAll
        draggable={draggable}
        onDrop={onDrop}
      />
    </>
  )
}
