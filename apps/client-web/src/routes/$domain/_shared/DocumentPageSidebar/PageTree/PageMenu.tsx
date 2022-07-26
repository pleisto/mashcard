import { useImperativeQuery } from '@/common/hooks'
import {
  GetTrashBlocksDocument,
  Scalars,
  useBlockCreateMutation,
  useBlockDuplicateMutation,
  useBlockPinOrUnpinMutation,
  useBlockRenameMutation
} from '@/MashcardGraphQL'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import { sleep } from '@mashcard/active-support'
import {
  Button,
  devWarning,
  Dropdown,
  Icon,
  Input,
  Menu,
  MenuProps,
  Popover,
  toast,
  Tooltip
} from '@mashcard/design-system'
import { appendFormulas } from '@mashcard/formula'
import { BlockMetaUpdated, MashcardEventBus, UpdateBlockMeta } from '@mashcard/schema'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocMeta } from '../../DocMeta'
import { queryBlockPins, queryPageBlocks } from '../../graphql'
import { FormulaContextVar } from '../../reactiveVars'
import { useBlockSoftDelete } from '../../useBlockSoftDelete'
import { useDocsI18n } from '../../useDocsI18n'
import { useFormulaActions } from '../../useFormulaActions'
import * as Root from './PageMenu.style'

type UUID = Scalars['UUID']

interface PageMenuProps {
  mutable?: boolean
  pageId: UUID
  title: Scalars['String']
  // setPopoverKey: React.Dispatch<React.SetStateAction<string | undefined>>
  titleText: string
  pin: boolean
  parentId?: string | null
  nearNodeId?: string
  icon: boolean
}

export const PageMenu: React.FC<PageMenuProps> = ({
  // setPopoverKey,
  pageId,
  mutable = true,
  pin,
  title,
  titleText,
  parentId,
  nearNodeId,
  icon
}) => {
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const client = useApolloClient()
  const formulaContext = useReactiveVar(FormulaContextVar)

  const { id, domain } = useDocMeta()

  const [popoverVisible, setPopoverVisible] = React.useState(false)
  const [dropdownVisible, setDropdownVisible] = React.useState(false)
  const [copied, setCopied] = React.useState<boolean>(false)
  const getPageBlocks = useImperativeQuery(queryPageBlocks)

  const [blockSoftDelete, { loading: blockDeleteLoading }] = useBlockSoftDelete(
    { id: pageId, username: domain },
    { refetchQueries: [queryPageBlocks, GetTrashBlocksDocument] }
  )

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockRename, { loading: renameBlockLoading }] = useBlockRenameMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockPinOrUnpin, { loading: blockPinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })

  const [blockDuplicate, { loading: blockDuplicateLoading }] = useBlockDuplicateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const deletePage = async (): Promise<void> => {
    const createNew = async (): Promise<void> => {
      const newPageInput = { title: '', username: domain }
      const { data } = await blockCreate({ variables: { input: newPageInput } })
      if (data?.blockCreate?.id) {
        await sleep(100).promise
        navigate(`/${domain}/${data?.blockCreate?.id}`)
      }
    }
    const input = { id: pageId, hardDelete: false }
    await blockSoftDelete({ variables: { input } })
    const {
      data: { pageBlocks }
    } = await getPageBlocks({ domain })
    if (location.pathname !== `/${domain}/${pageId}`) {
      if (!pageBlocks.length) {
        await createNew()
      }
      return
    }
    if (nearNodeId ?? parentId) {
      await sleep(100).promise
      navigate(`/${domain}/${nearNodeId ?? parentId}`)
      return
    }
    await createNew()
  }

  const onPressAddSubPage = async (): Promise<void> => {
    const input = { parentId: pageId, title: '', username: domain }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      navigate(`/${domain}/${data?.blockCreate?.id}`)
    }
  }

  const linkPath = `/${domain}/${pageId}`
  const link = `${window.location.origin}${linkPath}`

  const onRename = async (e: any): Promise<void> => {
    const title = e?.target?.value
    const input = { id: pageId, title }
    await blockRename({ variables: { input } })
    if (pageId === id) {
      // if (editor && !editor.isDestroyed) {
      //   editor.commands.setDocAttrs({ ...editor.state.doc.attrs, title })
      // }
      MashcardEventBus.dispatch(
        UpdateBlockMeta({
          id,
          meta: { title }
        })
      )
    } else {
      MashcardEventBus.dispatch(
        BlockMetaUpdated({
          id: pageId,
          meta: { title }
        })
      )
    }

    setPopoverVisible(false)
  }

  const { queryFormulas } = useFormulaActions()

  const doDuplicate = async (): Promise<void> => {
    const input = { id: pageId }
    const { data } = await blockDuplicate({ variables: { input } })
    const formulaIds = data?.blockDuplicate?.formulaIds ?? []

    if (formulaContext && formulaIds.length) {
      void queryFormulas(domain, formulaIds.join(',')).then(({ data, success }) => {
        if (!success) return
        void appendFormulas(formulaContext, data ?? [])
      })
    }

    setDropdownVisible(false)
  }

  const doCopyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(link)
    void toast.success(t('copy_link.success_message'))
    setCopied(true)
    setDropdownVisible(false)
    // removeSelectedKey()
    // TODO
    setCopied(false)
  }

  const doPin = async (): Promise<void> => {
    const input = { blockId: pageId, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
    if (pageId === id) {
      client.cache.modify({
        id: client.cache.identify({ __typename: 'BlockInfo', id }),
        fields: {
          pin() {
            return !pin
          }
        }
      })
    }
    setDropdownVisible(false)
    // removeSelectedKey()
  }

  const onDropdownVisibleChange = (value: boolean): void => {
    setDropdownVisible(value)
    /* if (value) {
     *   addSelectedKey()
     * } else {
     *   removeSelectedKey()
     * } */
  }

  const inputRef = React.useRef<any>(null)
  const handleEscape: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(e => {
    if (e.key === 'Escape') {
      setPopoverVisible(false)
    }
  }, [])
  const renamePopoverContent = (
    <Input
      // eslint-disable-next-line
      autoFocus
      prefix={<Icon.Edit />}
      disabled={renameBlockLoading}
      size="md"
      onPressEnter={onRename}
      onKeyDown={handleEscape}
      onBlur={onRename}
      ref={inputRef}
      defaultValue={titleText}
      borderType="underline"
    />
  )

  const onClickMenu: MenuProps['onAction'] = async (key: string) => {
    switch (key) {
      case 'delete':
        void deletePage()
        break
      case 'copy_link':
        void doCopyLink()
        break
      case 'duplicate':
        void doDuplicate()
        break
      case 'rename':
        // TODO focus and select all
        // inputRef.current.focus({ preventScroll: true })
        setDropdownVisible(false)
        setPopoverVisible(true)
        break
      case 'pin':
        void doPin()
        break
      default:
        devWarning(true, 'PageMenu.onClickMenu unknown key', key)
        break
    }
  }

  const onRenamePopoverVisibleChange = (value: boolean): void => {
    setPopoverVisible(value)

    if (value) {
      setDropdownVisible(false)
      // removeSelectedKey()
      // TODO focus and select all
      // inputRef.current.focus({ preventScroll: true })
    }
  }

  const menu = (
    <Menu onAction={onClickMenu}>
      <Menu.Item itemKey="pin" icon={pin ? <Icon.Pin /> : <Icon.Unpin />} disabled={blockPinLoading}>
        {t(pin ? 'pin.remove' : 'pin.add')}
      </Menu.Item>
      <Menu.Item itemKey="copy_link" icon={copied ? <Icon.Check /> : <Icon.Link />}>
        {t(copied ? 'copy_link.copied' : 'copy_link.button')}
      </Menu.Item>
      <Menu.Item itemKey="duplicate" icon={<Icon.Copy />} disabled={blockDuplicateLoading}>
        {t('duplicate.button')}
      </Menu.Item>
      <Menu.Item itemKey="rename" icon={<Icon.Edit />} disabled={renameBlockLoading}>
        {t('blocks.rename')}
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item danger itemKey="delete" icon={<Icon.Delete />} disabled={blockDeleteLoading}>
        {t('blocks.delete')}
      </Menu.Item>
    </Menu>
  )

  const linkData = (
    <Popover
      content={renamePopoverContent}
      title={null}
      placement="bottomStart"
      trigger="customEvent"
      visible={popoverVisible}
      onVisibleChange={onRenamePopoverVisibleChange}
      destroyTooltipOnHide={true}
      overlayInnerStyle={{ marginLeft: icon ? -25 : 0 }}
    >
      <Root.Title to={linkPath}>{title}</Root.Title>
    </Popover>
  )

  if (!mutable) {
    return <Root.Menu>{linkData}</Root.Menu>
  }

  return (
    <>
      <Dropdown
        trigger={['contextMenu']}
        overlay={menu}
        destoryPopupOnHide={true}
        visible={dropdownVisible}
        onVisibleChange={onDropdownVisibleChange}
        placement="bottomStart"
      >
        <Root.Menu>
          {linkData}
          <div>
            <Tooltip title={t('blocks.more')}>
              <Dropdown destoryPopupOnHide={true} trigger={['click']} overlay={menu} placement="bottomStart">
                <Button className="moreBtn" type="text">
                  <Icon.More />
                </Button>
              </Dropdown>
            </Tooltip>
            <Tooltip title={t('blocks.create_sub_pages')}>
              <Button
                className="addBtn"
                type="text"
                onClick={onPressAddSubPage}
                loading={createBlockLoading}
                disabled={createBlockLoading}
              >
                <Icon.Add />
              </Button>
            </Tooltip>
          </div>
        </Root.Menu>
      </Dropdown>
    </>
  )
}
