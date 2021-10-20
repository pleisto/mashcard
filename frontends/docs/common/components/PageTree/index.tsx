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
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const PageTree: React.FC<DocMetaProps> = ({ docMeta }) => {
  type BlockType = Exclude<Exclude<GetPageBlocksQuery['pageBlocks'], undefined>, null>[0]

  const { data } = useGetPageBlocksQuery({ variables: { webid: docMeta.webid } })

  const [blockMove] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })
  const [draggable, setDraggable] = useState<boolean>(true)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(docMeta.id ? [docMeta.id] : [])

  const { t } = useDocsI18n()

  const { data: pinData } = useGetBlockPinsQuery()
  const pinIds = pinData?.blockPins?.map(pin => pin.blockId) ?? []

  const getTitle = (block: BlockType): string => {
    const text = block.text
    if (/^\s*$/.test(text)) {
      return t('title.untitled')
    } else {
      return text
    }
  }

  const getIcon = (block: BlockType): string | null => {
    if (block.meta.icon?.type === Blocktype.Emoji) {
      return (block.meta.icon as BlockEmoji).emoji
    }

    return null
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

  const titleRender = (node: any): React.ReactElement => {
    const pin = pinIds.includes(node.key)
    return (
      <PageMenu
        docMeta={docMeta}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        pin={pin}
        pageId={node.key}
        title={node.fakeIcon ? `${node.fakeIcon} ${node.title}` : node.title}
        titleText={node.text}
      />
    )
  }

  // TODO fix type
  const treeElement = (blocks: BlockType[], draggable: boolean): React.ReactElement => {
    if (!blocks.length) {
      return <></>
    }
    const flattedData = blocks
      .map(b => {
        const title = getTitle(b)
        return {
          key: b.id,
          value: b.id,
          parentId: b.parentId,
          sort: b.sort,
          // icon: getIcon(b), // TODO fix style
          fakeIcon: getIcon(b),
          nextSort: b.nextSort,
          firstChildSort: b.firstChildSort,
          text: b.text,
          title
        }
      })
      .sort((a, b) => Number(a.sort) - Number(b.sort))
    const treeData = array2Tree(flattedData, { id: 'key' })
    return (
      <Tree
        className={styles.tree}
        selectedKeys={selectedKeys}
        blockNode={false}
        showIcon={true}
        selectable={!docMeta.documentInfoLoading}
        // expandedKeys={selectedKeys}
        treeData={treeData}
        defaultExpandAll
        draggable={draggable}
        onDrop={onDrop}
        titleRender={titleRender}
      />
    )
  }

  const pageBlocks = data?.pageBlocks ?? []

  const recursionFilter = (blocks: BlockType[], cursor: string): BlockType[] => {
    if (!cursor) {
      return []
    }
    return blocks.filter(block => block.parentId === cursor).flatMap(child => recursionFilter(blocks, child.id).concat([child]))
  }
  const pinRootBlocks: BlockType[] = pageBlocks.filter(block => pinIds.includes(block.id))
  const pinChildrenBlocks = pinRootBlocks.map(block => block.id).flatMap(id => recursionFilter(pageBlocks, id))

  const pinBlocks = pinRootBlocks.concat(pinChildrenBlocks)
  const pinTreeIds = pinBlocks.map(block => block.id)
  const pinTreeBlocks = pageBlocks
    .filter(block => pinTreeIds.includes(block.id))
    .map(block => {
      if (pinIds.includes(block.id) && block.parentId && !pinTreeIds.includes(block.parentId)) {
        return { ...block, parentId: undefined }
      } else {
        return block
      }
    })

  const pinTree = pinTreeBlocks.length ? (
    <>
      <h2>Pin</h2>
      {treeElement(pinTreeBlocks, false)}
      <Divider />
    </>
  ) : (
    <></>
  )

  return pageBlocks.length ? (
    <>
      {pinTree}
      <h2>Pages</h2>
      {treeElement(pageBlocks, draggable)}
    </>
  ) : (
    <></>
  )
}
