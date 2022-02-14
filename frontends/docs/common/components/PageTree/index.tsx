import React, { useMemo, useState } from 'react'
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
  TreeProps,
  TNode,
  Inserted,
  css,
  styled,
  toast,
  useSize,
  useMemoizedFn,
  theme
} from '@brickdoc/design-system'
import { array2Tree } from '@brickdoc/active-support'
import { PageMenu } from '../PageMenu'
import { SIZE_GAP } from '../../blocks'
import { queryPageBlocks } from '../../graphql'
import { useDocsI18n } from '../../hooks'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'
import { queryBlockInfo } from '@/docs/pages/graphql'
import { pagesVar } from '@/docs/reactiveVars'
import { BlockNameLoad, BrickdocEventBus } from '@brickdoc/schema'

export interface PageTreeProps extends DocMetaProps {
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

const PageTreeRoot = styled('div', {
  variants: {
    mode: {
      default: {
        marginBottom: '2rem'
      },
      subPage: {
        marginBottom: '0'
      }
    }
  }
})

export const PageTree: React.FC<PageTreeProps> = ({ docMeta, mode }) => {
  type BlockType = Exclude<Exclude<GetPageBlocksQuery['pageBlocks'], undefined>, null>[0]
  const navSize = useSize(document.querySelector('nav'))
  const mutable = mode !== 'subPage'
  const hideHeading = mode === 'subPage'

  const { data } = useGetPageBlocksQuery({ variables: { webid: docMeta.webid } })
  // recreate these blocks because we can't modify [data.pageBlocks]'s properties
  const [dataPageBlocks, setDataPageBlocks] = React.useState(
    data?.pageBlocks?.map(block => ({
      ...block
    })) ?? []
  )
  React.useEffect(() => {
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

  const getTitle = useMemoizedFn((block: BlockType): string => {
    const text = block.text
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
    const { sourceId, targetId, position } = attrs
    setDraggable(false)
    let targetParentId: string | undefined | null, sort: number
    const pageBlocks = (dataPageBlocks ?? []) as Block[]
    const node = pageBlocks.find(i => i.id === sourceId)
    const targetNode = pageBlocks.find(i => i.id === targetId)
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

    // update move result locally for performance
    const originTargetSort = node.sort
    const originTargetParentId = node.parentId

    setDataPageBlocks(prevBlocks => {
      const result = prevBlocks
        .map(block => {
          if (block.id !== node.id) return block

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
      id: node.id,
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
            if (block.id !== node.id) return block

            return {
              ...block,
              sort: originTargetSort,
              parentId: originTargetParentId
            }
          })
          .sort((a, b) => a.sort - b.sort)
      )
    } else if (docMeta.id === node.id) {
      await blockMoveClient.refetchQueries({ include: [queryBlockInfo] })
    }
  }

  const titleRender = (node: any): React.ReactElement => {
    const pin = pinIds.includes(node.key)

    return (
      <PageMenu
        mutable={mutable}
        docMeta={docMeta}
        // setPopoverKey={setPopoverKey}
        pin={pin}
        pageId={node.key}
        title={node.title}
        titleText={node.text}
      />
    )
  }

  const treeElement = (blocks: BlockType[], isDraggable: boolean, height?: number): React.ReactElement => {
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
        height={height}
        emptyNode={t('blocks.no_pages')}
        // selectable={!docMeta.documentInfoLoading}
        selectedNodeId={docMeta.id}
        treeNodeClassName={mode === 'subPage' ? subPageModeNodeStyle() : ''}
        treeData={treeData as unknown as TNode[]}
        draggable={draggable && isDraggable}
        onDrop={onDrop}
        titleRender={titleRender}
      />
    )
  }

  const pageBlocks = React.useMemo(() => {
    let blocks = dataPageBlocks
    const findRootParentId = (id: string): string => {
      const parentId = blocks.find(b => b.id === id)?.parentId
      if (parentId) return findRootParentId(parentId)
      return id
    }

    if (mode === 'subPage') {
      blocks = blocks.filter(b => {
        if (b.id === docMeta.id) return false
        return findRootParentId(b.id) === docMeta.id
      })
      return blocks.map(b => ({
        ...b,
        parentId: b.parentId === docMeta.id ? undefined : b.parentId
      }))
    }

    return blocks
  }, [dataPageBlocks, docMeta.id, mode])

  pageBlocks.forEach(b => {
    BrickdocEventBus.dispatch(BlockNameLoad({ id: b.id, name: b.text }))
  })

  React.useEffect(() => {
    const flattedData = (dataPageBlocks ?? [])
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

  const pinTree = pinTreeBlocks.length ? (
    <>
      <h2>Pin</h2>
      {treeElement(pinTreeBlocks, false)}
    </>
  ) : (
    <></>
  )

  const pageHeight = useMemo(() => {
    let _h = 200
    if (navSize?.height) {
      _h = navSize.height - (pinTreeBlocks?.length ? 470 : 203)
    }
    return _h < 200 ? 200 : _h
  }, [navSize, pinTreeBlocks])

  return pageBlocks.length ? (
    <PageTreeRoot mode={mode ?? 'default'}>
      {pinTree}
      {!hideHeading && <h2>Pages</h2>}
      {treeElement(pageBlocks, draggable && mutable, pageHeight)}
    </PageTreeRoot>
  ) : (
    <>{mode === 'subPage' && <SubPageModeEmptyNode>{t('blocks.no_pages')}</SubPageModeEmptyNode>}</>
  )
}
