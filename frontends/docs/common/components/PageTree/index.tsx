import React, { useState } from 'react'
import { find, propEq } from 'ramda'
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
/* import { Tree, TreeProps } from '@brickdoc/design-system' */

// TODO: change to design-system
import { Tree, TreeProps, TNode, Inserted } from '@brickdoc/brickdoc-headless-design-system'
import { array2Tree } from '@/common/utils'
import { PageMenu } from '../PageMenu'
import { SIZE_GAP } from '../../blocks'
import { queryPageBlocks } from '../../graphql'
import styles from './PageTree.module.less'
import { useDocsI18n } from '../../hooks'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'
import { queryBlockInfo } from '@/docs/pages/graphql'
import { pagesVar } from '@/docs/reactiveVars'
import { BlockNameLoad, BrickdocEventBus } from '@brickdoc/schema'
import { message } from '@brickdoc/design-system'

export const PageTree: React.FC<DocMetaProps> = ({ docMeta }) => {
  type BlockType = Exclude<Exclude<GetPageBlocksQuery['pageBlocks'], undefined>, null>[0]

  const { data } = useGetPageBlocksQuery({ variables: { webid: docMeta.webid } })
  const [blockMove, { client: blockMoveClient }] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })
  const [draggable, setDraggable] = useState<boolean>(true)

  const { t } = useDocsI18n()

  const { data: pinData } = useGetBlockPinsQuery()
  const pinIds = pinData?.blockPins?.map(pin => pin.blockId) ?? []

  const getTitle = React.useCallback(
    (block: BlockType): string => {
      const text = block.text
      if (/^\s*$/.test(text)) {
        return t('title.untitled')
      } else {
        return text
      }
    },
    [t]
  )

  const getIcon = React.useCallback((block: BlockType): string | null => {
    if (block.meta.icon?.type === Blocktype.Emoji) {
      return (block.meta.icon as BlockEmoji).emoji
    }

    return ''
  }, [])

  //
  const onDrop: TreeProps['onDrop'] = async (attrs): Promise<void> => {
    const { sourceId, targetId, position } = attrs
    setDraggable(false)
    let targetParentId: string | undefined | null, sort: number
    const node = find<Block>(propEq('id', sourceId))((data?.pageBlocks ?? []) as Block[])
    const targetNode = find<Block>(propEq('id', targetId))((data?.pageBlocks ?? []) as Block[])
    if (!node?.id) {
      setDraggable(true)
      return
    }

    if (targetNode?.parentId) {
      // root node
      targetParentId = targetNode.parentId
    }

    switch (position) {
      case Inserted.Top:
        sort = (targetNode?.sort ?? 0) - 1
        break
      case Inserted.Child:
        targetParentId = targetId
        sort = Number(node.firstChildSort) - SIZE_GAP
        break
      case Inserted.Bottom:
        sort = Math.round(0.5 * (Number(targetNode?.sort ?? 0) + Number(targetNode?.nextSort ?? 0)))
        break
    }

    const input: BlockMoveInput = {
      id: node.id,
      sort
    }
    if (targetParentId) {
      input.targetParentId = targetParentId
    }

    const { data: blockMoveData } = await blockMove({ variables: { input } })

    const errorMessage = blockMoveData?.blockMove?.errors?.[0]

    if (errorMessage) {
      void message.error(errorMessage)
    } else if (docMeta.id === node.id) {
      await blockMoveClient.refetchQueries({ include: [queryBlockInfo] })
    }

    setDraggable(true)
  }

  const titleRender = (node: any): React.ReactElement => {
    const pin = pinIds.includes(node.key)

    return (
      <PageMenu
        docMeta={docMeta}
        // setPopoverKey={setPopoverKey}
        pin={pin}
        pageId={node.key}
        title={node.title}
        titleText={node.text}
      />
    )
  }

  const treeElement = (blocks: BlockType[], isDraggable: boolean): React.ReactElement => {
    if (!blocks.length) {
      return <></>
    }

    const flattedData = blocks
      .map(b => {
        const title = getTitle(b)

        return {
          key: b.id,
          value: b.id,
          rootId: b.rootId,
          parentId: b.parentId,
          sort: b.sort,
          icon: getIcon(b),
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
        emptyNode={t('blocks.no_pages')}
        // selectable={!docMeta.documentInfoLoading}
        selectedNodeId={docMeta.id}
        treeData={treeData as unknown as TNode[]}
        draggable={draggable && isDraggable}
        onDrop={onDrop}
        titleRender={titleRender}
      />
    )
  }

  const pageBlocks = data?.pageBlocks ?? []

  pageBlocks.forEach(b => {
    BrickdocEventBus.dispatch(BlockNameLoad({ id: b.id, name: b.text }))
  })

  React.useEffect(() => {
    const flattedData = (data?.pageBlocks ?? [])
      .map(b => {
        const title = getTitle(b)
        return {
          key: b.id,
          value: b.id,
          parentId: b.parentId,
          rootId: b.rootId,
          sort: b.sort,
          icon: getIcon(b),
          nextSort: b.nextSort,
          firstChildSort: b.firstChildSort,
          text: b.text,
          title
        }
      })
      .sort((a, b) => Number(a.sort) - Number(b.sort))

    pagesVar(flattedData)
  }, [data?.pageBlocks, getTitle, getIcon])

  const recursionFilter = (blocks: BlockType[], cursor: string): BlockType[] => {
    if (!cursor) {
      return []
    }
    return blocks
      .filter(block => block.parentId === cursor)
      .flatMap(child => recursionFilter(blocks, child.id).concat([child]))
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
    </>
  ) : (
    <></>
  )

  return pageBlocks.length ? (
    <div className={styles.pageTree}>
      {pinTree}
      <h2>Pages</h2>
      {treeElement(pageBlocks, draggable)}
    </div>
  ) : (
    <></>
  )
}
