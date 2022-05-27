import React, { useState, useEffect } from 'react'
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
import {
  Tree,
  type TreeProps,
  type TreeNode,
  type TreeNodeRenderer,
  NodeRelativeSpot,
  css,
  styled,
  toast,
  useMemoizedFn,
  theme
} from '@brickdoc/design-system'
import { array2Tree } from '@brickdoc/active-support'
import { PageMenu } from '../PageMenu'
import { SIZE_GAP } from '../../blocks'
import { queryPageBlocks } from '../../graphql'
import { useDocsI18n } from '../../hooks'
import { queryBlockInfo } from '@/docs/pages/graphql'
import { pagesVar } from '@/docs/reactiveVars'
import { BlockNameLoad, BrickdocEventBus } from '@brickdoc/schema'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
interface DocMeta {
  id?: string | undefined
  domain: string
  host: string
}

export interface PageTreeProps {
  docMeta: DocMeta
  mode?: 'default' | 'subPage'
}

const subPageModeNodeStyle = css({
  borderRadius: '0 !important',
  boxShadow: 'none !important'
})

const SubPageModeEmptyNode = styled('span', {
  color: theme.colors.typeDisabled,
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem',
  paddingLeft: '1.75rem'
})

const PageTreeRoot = styled('div', {})

const PageTreeHeading = styled('div', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.callout,
  fontWeight: 500,
  lineHeight: '2rem',
  paddingLeft: theme.space.md,
  position: 'sticky',
  zIndex: 1,
  backdropFilter: 'blur(10px)'
})

const TREE_HEAD_HEIGHT = 32
const FOOTER_HEIGHT = 46

export const PageTree: React.FC<PageTreeProps> = ({ docMeta, mode }) => {
  type BlockType = Exclude<Exclude<GetPageBlocksQuery['pageBlocks'], undefined>, null>[0]
  const mutable = mode !== 'subPage'
  const hideHeading = mode === 'subPage'

  const { data } = useGetPageBlocksQuery({ variables: { domain: docMeta.domain } })
  // recreate these blocks because we can't modify [data.pageBlocks]'s properties
  const [dataPageBlocks, setDataPageBlocks] = useState(
    data?.pageBlocks?.map(block => ({
      ...block
    })) ?? []
  )
  useEffect(() => {
    setDataPageBlocks(
      data?.pageBlocks?.map(block => ({
        ...block
      })) ?? []
    )
  }, [data?.pageBlocks])

  const [blockMove, { client: blockMoveClient }] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })
  const [draggable, setDraggable] = useState<boolean>(true)

  const { t } = useDocsI18n()

  const { data: pinData } = useGetBlockPinsQuery()
  const pinIds = pinData?.blockPins?.map(pin => pin.blockId) ?? []

  const getTitle = useMemoizedFn((text: string): string => {
    if (/^\s*$/.test(text)) {
      return t('title.untitled')
    } else {
      return text
    }
  })

  const getIcon = useMemoizedFn((block: BlockType): string | null => {
    if (block.meta.icon?.type === Blocktype.Emoji) {
      return (block.meta.icon as BlockEmoji).emoji
    }

    return ''
  })

  //
  const onDrop: TreeProps['onDrop'] = async (attrs): Promise<void> => {
    const { sourceId, targetId, targetSpot } = attrs
    setDraggable(false)
    let targetParentId: string | undefined | null, sort: number
    const pageBlocks = (dataPageBlocks ?? []) as Block[]
    const sourceBlock = pageBlocks.find(i => i.id === sourceId)
    const targetBlock = pageBlocks.find(i => i.id === targetId)
    if (!sourceBlock?.id) {
      setDraggable(true)
      return
    }

    if (targetBlock?.parentId) {
      // root node
      targetParentId = targetBlock.parentId
    }

    switch (targetSpot) {
      case NodeRelativeSpot.Before:
        sort = (targetBlock?.sort ?? 0) - 1
        break
      case NodeRelativeSpot.AsChild:
        targetParentId = targetId
        sort = Number(sourceBlock.firstChildSort) - SIZE_GAP
        break
      case NodeRelativeSpot.After:
        sort = Math.round(0.5 * (Number(targetBlock?.sort ?? 0) + Number(targetBlock?.nextSort ?? 0)))
        break
    }

    // update move result locally for performance
    const originTargetSort = sourceBlock.sort
    const originTargetParentId = sourceBlock.parentId

    setDataPageBlocks(prevBlocks => {
      const result = prevBlocks
        .map(block => {
          if (block.id !== sourceBlock.id) return block

          return {
            ...block,
            sort: sort.toString(),
            parentId: targetParentId ?? block.parentId
          }
        })
        .sort((a, b) => Number(a.sort) - Number(b.sort))

      return result
    })

    setDraggable(true)

    const input: BlockMoveInput = {
      id: sourceBlock.id,
      sort
    }
    if (targetParentId) {
      input.targetParentId = targetParentId
    }

    const { data: blockMoveData } = await blockMove({ variables: { input } })

    const errorMessage = blockMoveData?.blockMove?.errors?.[0]

    if (errorMessage) {
      void toast.error(errorMessage)
      // revert local update if error occurred
      setDataPageBlocks(prevBlocks =>
        prevBlocks
          .map(block => {
            if (block.id !== sourceBlock.id) return block

            return {
              ...block,
              sort: originTargetSort,
              parentId: originTargetParentId
            }
          })
          .sort((a, b) => a.sort - b.sort)
      )
    } else if (docMeta.id === sourceBlock.id) {
      await blockMoveClient.refetchQueries({ include: [queryBlockInfo] })
    }
  }

  const titleRender: TreeNodeRenderer = node => {
    const pin = pinIds.includes(node.id)

    return (
      <PageMenu
        mutable={mutable}
        docMeta={docMeta}
        pin={pin}
        pageId={node.id}
        icon={!!node.icon}
        title={getTitle(node.text)}
        titleText={node.text}
        nearNodeId={node.nearNodeId}
        parentId={node.parentId}
      />
    )
  }

  const treeElement = (blocks: BlockType[], isDraggable: boolean): React.ReactElement => {
    if (!blocks.length) {
      return <></>
    }

    const flattedData = blocks
      .map<TreeNode & { sort: number }>(b => {
        return {
          id: b.id,
          value: b.id,
          rootId: b.rootId,
          parentId: b.parentId,
          sort: b.sort,
          icon: getIcon(b),
          nextSort: b.nextSort,
          firstChildSort: b.firstChildSort,
          text: b.text
        }
      })
      .sort((a, b) => Number(a.sort) - Number(b.sort))

    const treeData = array2Tree(flattedData)

    return (
      <Tree
        emptyNode={t('blocks.no_pages')}
        initialSelectedId={docMeta.id}
        currentSelectedId={docMeta.id}
        treeNodeClassName={mode === 'subPage' ? subPageModeNodeStyle() : ''}
        data={treeData as unknown as TreeNode[]}
        draggable={draggable && isDraggable}
        onDrop={onDrop}
        renderNode={titleRender}
      />
    )
  }

  const pageBlocks = React.useMemo(() => {
    const blocks = dataPageBlocks

    if (mode === 'subPage') {
      const isNodeInsideCurrentRoot = (id: string): boolean => {
        const parentId = blocks.find(b => b.id === id)?.parentId
        // docMeta.id is the root of current page
        if (parentId === docMeta.id) return true
        if (parentId) return isNodeInsideCurrentRoot(parentId)
        return false
      }

      return blocks
        .filter(b => isNodeInsideCurrentRoot(b.id))
        .map(b => ({
          ...b,
          parentId: b.parentId === docMeta.id ? undefined : b.parentId
        }))
    }

    return blocks
  }, [dataPageBlocks, docMeta.id, mode])

  useEffect(() => {
    pageBlocks.forEach(b => {
      if (!b.parentId || b.type === 'doc') {
        BrickdocEventBus.dispatch(BlockNameLoad({ id: b.id, name: b.text }))
      }
    })
  }, [pageBlocks])

  useEffect(() => {
    const flattedData = (dataPageBlocks ?? [])
      .map(b => {
        const title = getTitle(b.text)
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
  }, [dataPageBlocks, getTitle, getIcon])

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
  const showPin = !!pinTreeBlocks.length
  const pinTree =
    mode !== 'subPage' && showPin ? (
      <>
        <PageTreeHeading style={{ top: 0 }}>Pin</PageTreeHeading>
        {treeElement(pinTreeBlocks, false)}
      </>
    ) : (
      <></>
    )

  return pageBlocks.length ? (
    <>
      <PageTreeRoot>
        {pinTree}
        {!hideHeading && (
          <PageTreeHeading
            style={{ top: showPin ? TREE_HEAD_HEIGHT : 0, bottom: FOOTER_HEIGHT }} // Consider also the two cases of sticking to the bottom and the top
            data-testid={TEST_ID_ENUM.page.pageTree.heading.id}
          >
            Pages
          </PageTreeHeading>
        )}
        {treeElement(pageBlocks, draggable && mutable)}
      </PageTreeRoot>
    </>
  ) : (
    <>{mode === 'subPage' && <SubPageModeEmptyNode>{t('blocks.no_pages')}</SubPageModeEmptyNode>}</>
  )
}
