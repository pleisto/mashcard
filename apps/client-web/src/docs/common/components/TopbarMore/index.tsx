import React, { useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrickdocEventBus, Undo } from '@brickdoc/schema'
import {
  useBlockPinOrUnpinMutation,
  useBlockSoftDeleteMutation,
  GetTrashBlocksDocument,
  useBlockCreateMutation,
  useBlockDuplicateMutation
} from '@/BrickdocGraphQL'
import { queryBlockPins, queryPageBlocks } from '@/docs/common/graphql'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import { itemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
import { Button, Icon, Popover, Menu } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { useImperativeQuery } from '@/common/hooks'
import { BrickdocContext } from '@/common/brickdocContext'
import { array2Tree } from '@brickdoc/active-support'
import { sleep } from '@/common/utils'
import { FormulaContextVar } from '@/docs/reactiveVars'
import { useFormulaActions } from '@/docs/pages/hooks/useFormulaActions'
import { appendFormulas } from '@brickdoc/formula'
import { IconWrapper, KeyBindTip } from './index.style'
import { useDocMeta } from '@/docs/store/DocMeta'

export interface DiscussionMenuProps {
  className?: string
}

const PopMenu = (props: { menuToggle: (state: boolean) => void }) => {
  const { menuToggle } = props
  const { id, pin, isMine, editable } = useDocMeta()
  const navigate = useNavigate()
  const { t } = useDocsI18n()
  const client = useApolloClient()
  const formulaContext = useReactiveVar(FormulaContextVar)
  const { queryFormulas } = useFormulaActions()
  const { currentSpace } = useContext(BrickdocContext)
  const { domain: loginDomain } = currentSpace

  const getPageBlocks = useImperativeQuery(queryPageBlocks)
  const [blockPinOrUnpin, { loading: blockPinOrUnpinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })
  const [blockSoftDelete] = useBlockSoftDeleteMutation({
    refetchQueries: [queryPageBlocks, GetTrashBlocksDocument]
  })
  const [blockCreate] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const [blockDuplicate] = useBlockDuplicateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const iconRender = pin ? <Icon.Pin /> : <Icon.Unpin />

  const showPin = isMine

  const onPin = async (): Promise<void> => {
    const input = { blockId: id!, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
    client.cache.modify({
      id: client.cache.identify({ __typename: 'BlockInfo', id }),
      fields: {
        pin() {
          return !pin
        }
      }
    })
  }

  const onDuplicate = useCallback(async (): Promise<void> => {
    const input = { id: id! }
    const { data } = await blockDuplicate({ variables: { input } })
    const formulaIds = data?.blockDuplicate?.formulaIds ?? []

    if (formulaContext && formulaIds.length) {
      void queryFormulas(loginDomain, formulaIds.join(',')).then(({ data, success }) => {
        if (!success) return
        void appendFormulas(formulaContext, data ?? [])
      })
    }

    menuToggle(false)
  }, [blockDuplicate, id, queryFormulas, menuToggle, formulaContext, loginDomain])

  const onDel = useCallback(async (): Promise<void> => {
    const input = { id: id!, hardDelete: false }
    const createNewAndJump = async () => {
      const newPageInput = { title: '' }
      const { data } = await blockCreate({ variables: { input: newPageInput } })
      if (data?.blockCreate?.id) {
        await sleep(100)
        navigate(`/${loginDomain}/${data?.blockCreate?.id}`)
      }
    }
    let {
      data: { pageBlocks }
    } = await getPageBlocks({ domain: loginDomain })
    pageBlocks = [...pageBlocks].sort((a: any, b: any) => Number(a.sort) - Number(b.sort))
    await blockSoftDelete({ variables: { input } })
    menuToggle(false)
    const matchBlock = pageBlocks.find((item: any) => item.id === id)
    if (!matchBlock) {
      createNewAndJump()
      return
    }
    if (matchBlock.parentId && matchBlock.parentId !== id) {
      const sameLevelItems = pageBlocks.filter((item: any) => item.parentId === matchBlock.parentId)
      if (sameLevelItems.length < 2) {
        navigate(`/${loginDomain}/${matchBlock.parentId}`)
      }
      const preIdx = sameLevelItems.findIndex((item: any) => item.id === id) - 1
      const nearItem = sameLevelItems[preIdx < 0 ? 1 : preIdx]
      navigate(`/${loginDomain}/${nearItem.id}`)
      return
    }
    const tree = array2Tree(pageBlocks)
    if (tree.length < 2) {
      createNewAndJump()
      return
    }
    const preIdx = tree.findIndex((item: any) => item.id === id) - 1
    const nearItem = tree[preIdx < 0 ? 1 : preIdx]
    navigate(`/${loginDomain}/${nearItem.id}`)
  }, [blockCreate, navigate, menuToggle, blockSoftDelete, id, getPageBlocks, loginDomain])

  const onUndo = () => {
    BrickdocEventBus.dispatch(Undo({}))
    menuToggle(false)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.metaKey && e.key === 'd') {
        onDuplicate()
        e.preventDefault()
      }
      if (e.key === 'Delete') {
        onDel()
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onDuplicate, onDel])
  return (
    <Menu style={{ padding: '8px 0' }}>
      {showPin && (
        <Menu.Item
          onClick={onPin}
          itemKey="pin"
          disabled={blockPinOrUnpinLoading}
          icon={<IconWrapper>{iconRender}</IconWrapper>}
          label={t(pin ? 'pin.remove_tooltip' : 'pin.add_tooltip')}
        />
      )}
      <Menu.Item
        itemKey="Duplicate"
        onClick={onDuplicate}
        icon={
          <IconWrapper>
            <Icon.Copy />
          </IconWrapper>
        }
        label={t('duplicate.button')}
        tip={<KeyBindTip>⌘+D</KeyBindTip>}
      />
      {isMine && (
        <Menu.Item
          onClick={onDel}
          icon={
            <IconWrapper>
              <Icon.Delete />
            </IconWrapper>
          }
          itemKey="Delete"
          label={t('blocks.delete')}
          tip={<KeyBindTip>Del</KeyBindTip>}
        />
      )}
      {editable && (
        <Menu.Item
          onClick={onUndo}
          itemKey="Undo"
          icon={
            <IconWrapper>
              <Icon.Undo />
            </IconWrapper>
          }
          label={t('blocks.undo')}
          tip={<KeyBindTip>⌘+Z</KeyBindTip>}
        />
      )}
    </Menu>
  )
}

export const TopbarMore: React.FC<DiscussionMenuProps> = ({ className }) => {
  const { t } = useDocsI18n()
  const [popoverVisible, setPopoverVisible] = React.useState(false)
  return (
    <Popover
      overlayInnerStyle={{ padding: 0, marginRight: -5 }}
      title={null}
      trigger="click"
      placement="bottomEnd"
      destroyTooltipOnHide
      visible={popoverVisible}
      onVisibleChange={setPopoverVisible}
      content={<PopMenu menuToggle={setPopoverVisible} />}
    >
      <Button className={className} type="text" css={itemStyle}>
        <Icon.More aria-label={t('more.tooltip')} />
      </Button>
    </Popover>
  )
}
