import { useImperativeQuery } from '@/common/hooks'
import {
  GetTrashBlocksDocument,
  useBlockCreateMutation,
  useBlockDuplicateMutation,
  useBlockPinOrUnpinMutation
} from '@/MashcardGraphQL'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import { array2Tree, sleep } from '@mashcard/active-support'
import { Button, Icon, Menu, Popover } from '@mashcard/design-system'
import { appendFormulas } from '@mashcard/formula'
import { MashcardEventBus, Undo } from '@mashcard/schema'
import React, { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocMeta } from '../../../../_shared/DocMeta'
import { FormulaContextVar } from '../../../../_shared/reactiveVars'
import { useBlockSoftDelete } from '../../../../_shared/useBlockSoftDelete'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'
import { useFormulaActions } from '../../../../_shared/useFormulaActions'
import { itemStyle } from '../DocumentTopBar.style'
import { queryBlockPins, queryPageBlocks } from '../../../../_shared/graphql'
import { IconWrapper, KeyBindTip } from './TopbarMore.style'

export interface DiscussionMenuProps {
  className?: string
}

const PopMenu: FC<{ menuToggle: (state: boolean) => void }> = ({ menuToggle }) => {
  const { t } = useDocsI18n()
  const { id, isMine, editable, domain, documentInfo } = useDocMeta()
  const pin = documentInfo?.pin
  const navigate = useNavigate()
  const client = useApolloClient()
  const formulaContext = useReactiveVar(FormulaContextVar)
  const { queryFormulas } = useFormulaActions()

  const getPageBlocks = useImperativeQuery(queryPageBlocks)
  const [blockPinOrUnpin, { loading: blockPinOrUnpinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })
  const [blockSoftDelete] = useBlockSoftDelete(
    { id: id as string, username: domain },
    { refetchQueries: [queryPageBlocks, GetTrashBlocksDocument] }
  )
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
      void queryFormulas(domain, formulaIds.join(',')).then(({ data, success }) => {
        if (!success) return
        void appendFormulas(formulaContext, data ?? [])
      })
    }

    menuToggle(false)
  }, [blockDuplicate, id, queryFormulas, menuToggle, formulaContext, domain])

  const onDel = useCallback(async (): Promise<void> => {
    const input = { id: id!, hardDelete: false }
    const createNewAndJump = async (): Promise<void> => {
      const newPageInput = { title: '', username: domain }
      const { data } = await blockCreate({ variables: { input: newPageInput } })
      if (data?.blockCreate?.id) {
        await sleep(100).promise
        navigate(`/${domain}/${data?.blockCreate?.id}`)
      }
    }
    let {
      data: { pageBlocks }
    } = await getPageBlocks({ domain })
    pageBlocks = [...pageBlocks].sort((a: any, b: any) => Number(a.sort) - Number(b.sort))
    await blockSoftDelete({ variables: { input } })
    menuToggle(false)
    const matchBlock = pageBlocks.find((item: any) => item.id === id)
    if (!matchBlock) {
      await createNewAndJump()
      return
    }
    if (matchBlock.parentId && matchBlock.parentId !== id) {
      const sameLevelItems = pageBlocks.filter((item: any) => item.parentId === matchBlock.parentId)
      if (sameLevelItems.length < 2) {
        navigate(`/${domain}/${matchBlock.parentId}`)
      }
      const preIdx = sameLevelItems.findIndex((item: any) => item.id === id) - 1
      const nearItem = sameLevelItems[preIdx < 0 ? 1 : preIdx]
      navigate(`/${domain}/${nearItem.id}`)
      return
    }
    const tree = array2Tree(pageBlocks)
    if (tree.length < 2) {
      await createNewAndJump()
      return
    }
    const preIdx = tree.findIndex((item: any) => item.id === id) - 1
    const nearItem = tree[preIdx < 0 ? 1 : preIdx]
    navigate(`/${domain}/${nearItem.id}`)
  }, [blockCreate, navigate, menuToggle, blockSoftDelete, id, getPageBlocks, domain])

  const onUndo = (): void => {
    MashcardEventBus.dispatch(Undo({}))
    menuToggle(false)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.metaKey && e.key === 'd') {
        void onDuplicate()
        e.preventDefault()
      }
      if (e.key === 'Delete') {
        void onDel()
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
