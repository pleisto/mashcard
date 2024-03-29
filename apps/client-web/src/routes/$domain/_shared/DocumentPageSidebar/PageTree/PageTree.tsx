import {
  Block,
  BlockEmoji,
  BlockMoveInput,
  BlockType as BlockEnum,
  GetPageBlocksQuery,
  useBlockMoveMutation,
  useGetBlockPinsQuery,
  useGetPageBlocksQuery
} from '@/MashcardGraphQL'
import { array2Tree } from '@mashcard/active-support'
import {
  css,
  NodeRelativeSpot,
  styled,
  theme,
  toast,
  Tree,
  useMemoizedFn,
  type TreeNode,
  type TreeNodeRenderer,
  type TreeProps
} from '@mashcard/design-system'
import { dispatchFormulaBlockNameChange } from '@mashcard/formula'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import React, { useEffect, useState } from 'react'
import { useDocMeta } from '../../DocMeta'
import { queryPageBlocks } from '../../graphql'
import { pagesVar } from '../../reactiveVars'
import { useDocsI18n } from '../../useDocsI18n'
import { PageMenu } from './PageMenu'

export const SIZE_GAP = 2 ** 32

export interface PageTreeProps {
  mode?: 'default' | 'subPage'
}

type BlockType = Exclude<Exclude<GetPageBlocksQuery['pageBlocks'], undefined>, null>[0]

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

export const PageTree: React.FC<PageTreeProps> = ({ mode }) => {
  const { t } = useDocsI18n()
  const mutable = mode !== 'subPage'
  const hideHeading = mode === 'subPage'

  const { id, domain } = useDocMeta()

  const { data } = useGetPageBlocksQuery({ variables: { domain } })
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

  const [blockMove] = useBlockMoveMutation({ refetchQueries: [queryPageBlocks] })
  const [draggable, setDraggable] = useState<boolean>(true)

  const { data: pinData } = useGetBlockPinsQuery()
  const pinIds = pinData?.blockPins?.map(pin => pin.blockId) ?? []

  const getTitle = useMemoizedFn((block: BlockType): string => {
    const title = block.documentInfo?.title
    if (!title || /^\s*$/.test(title)) {
      return t('title.untitled')
    } else {
      return title
    }
  })

  const getIcon = useMemoizedFn((block: BlockType): string | null => {
    if (block.documentInfo?.icon?.type === BlockEnum.Emoji) {
      return (block.documentInfo?.icon as BlockEmoji).emoji
    } else {
      return ''
    }
  })

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
    }
  }

  const titleRender: TreeNodeRenderer = node => {
    const pin = pinIds.includes(node.id)

    return (
      <PageMenu
        mutable={mutable}
        pin={pin}
        pageId={node.id}
        icon={!!node.icon}
        title={node.text}
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
          parentId: b.parentId,
          sort: b.sort,
          icon: getIcon(b),
          text: getTitle(b),
          nextSort: b.nextSort,
          firstChildSort: b.firstChildSort
        }
      })
      .sort((a, b) => Number(a.sort) - Number(b.sort))

    const treeData = array2Tree(flattedData)

    return (
      <Tree
        emptyNode={t('blocks.no_pages')}
        initialSelectedId={id}
        currentSelectedId={id}
        treeNodeClassName={mode === 'subPage' ? subPageModeNodeStyle() : ''}
        data={treeData as unknown as TreeNode[]}
        draggable={draggable && isDraggable}
        onDrop={onDrop}
        renderNode={titleRender}
        expandParentOnSelect={true}
      />
    )
  }

  const pageBlocks = React.useMemo(() => {
    const blocks = dataPageBlocks

    if (mode === 'subPage') {
      const isNodeInsideCurrentRoot = (id: string): boolean => {
        const parentId = blocks.find(b => b.id === id)?.parentId
        // docMeta.id is the root of current page
        if (parentId === id) return true
        if (parentId) return isNodeInsideCurrentRoot(parentId)
        return false
      }

      return blocks
        .filter(b => isNodeInsideCurrentRoot(b.id))
        .map(b => ({
          ...b,
          parentId: b.parentId === id ? undefined : b.parentId
        }))
    }

    return blocks
  }, [dataPageBlocks, id, mode])

  useEffect(() => {
    pageBlocks.forEach(b => {
      if (!b.parentId) {
        void dispatchFormulaBlockNameChange({ id: b.id, name: b.documentInfo?.title ?? '', username: domain })
      }
    })
  }, [pageBlocks, domain])

  useEffect(() => {
    const flattedData = (dataPageBlocks ?? [])
      .map(b => {
        const title = getTitle(b)
        return {
          key: b.id,
          value: b.id,
          parentId: b.parentId,
          sort: b.sort,
          icon: getIcon(b),
          nextSort: b.nextSort,
          firstChildSort: b.firstChildSort,
          text: title,
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
            data-testid={TEST_ID_ENUM.page.pageTree.heading.id}>
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
