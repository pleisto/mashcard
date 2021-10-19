import React from 'react'
import { Button, Dropdown, Input, Menu, MenuProps, message, Popover, Tooltip } from '@brickdoc/design-system'
import { Link, useHistory } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import {
  useBlockSoftDeleteMutation,
  Scalars,
  useBlockCreateMutation,
  useBlockRenameMutation,
  useBlockPinOrUnpinMutation,
  BlockIdKind,
  useBlockDuplicateMutation
} from '@/BrickdocGraphQL'
import { queryBlockPins, queryPageBlocks } from '../../graphql'
import { queryBlockInfo, queryChildrenBlocks } from '@/docs/pages/graphql'
import { Add, Check, CheckOneFill, Copy, Delete, Edit, Link as LinkIcon, More, Star } from '@brickdoc/design-system/components/icon'
import styles from './styles.module.less'
import { DocMeta } from '@/docs/pages/DocumentContentPage'

type UUID = Scalars['UUID']

interface PageMenuProps {
  docMeta: DocMeta
  pageId: UUID
  title: Scalars['String']
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>
  selectedKeys: string[]
  titleText: string
  pin: boolean
}

export const PageMenu: React.FC<PageMenuProps> = ({
  docMeta: { id, webid, host },
  selectedKeys,
  setSelectedKeys,
  pageId,
  pin,
  title,
  titleText
}) => {
  const history = useHistory()
  const [popoverVisible, setPopoverVisible] = React.useState(false)
  const [dropdownVisible, setDropdownVisible] = React.useState(false)
  const [copied, setCopied] = React.useState<boolean>(false)

  const [blockSoftDelete, { client: deleteClient, loading: blockDeleteLoading }] = useBlockSoftDeleteMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockRename, { loading: renameBlockLoading, client: renameClient }] = useBlockRenameMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockPinOrUnpin, { client: pinClient, loading: blockPinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })

  const [blockDuplicate, { loading: blockDuplicateLoading }] = useBlockDuplicateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const deletePage = async (): Promise<void> => {
    const input = { id: pageId }
    await blockSoftDelete({ variables: { input } })
    if (pageId === id) {
      await deleteClient.refetchQueries({ include: [queryBlockInfo, queryChildrenBlocks] })
    }
  }

  const onClickPlus = async (event: { stopPropagation: () => any }): Promise<void> => {
    void event.stopPropagation()
    const input = { parentId: pageId, title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      history.push(`/${webid}/${BlockIdKind.P}/${data?.blockCreate?.id}`)
    }
  }

  const { t } = useDocsI18n()
  const linkPath = `/${webid}/${BlockIdKind.P}/${pageId}`
  const link = `${host}${linkPath}`

  const addSelectedKey = (): void => {
    setSelectedKeys([...new Set([...selectedKeys, pageId])])
  }

  const removeSelectedKey = (): void => {
    setSelectedKeys(selectedKeys.filter(key => key !== pageId))
  }

  const onClickMoreButton = (e: { preventDefault: () => void; stopPropagation: () => void }): void => {
    e.preventDefault()
    e.stopPropagation()
    setDropdownVisible(true)
    addSelectedKey()
  }

  const onRename = async (e: any): Promise<void> => {
    const input = { id: pageId, title: e.target.value }
    await blockRename({ variables: { input } })
    if (pageId === id) {
      await renameClient.refetchQueries({ include: [queryChildrenBlocks, queryBlockInfo] })
    }
    setPopoverVisible(false)
  }

  const duDuplicate = async (): Promise<void> => {
    const input = { id: pageId }
    await blockDuplicate({ variables: { input } })
  }

  const doCopyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(link)
    void message.success(t('copy_link.success_message'))
    setCopied(true)
    setDropdownVisible(false)
    removeSelectedKey()
    // TODO
    setCopied(false)
  }

  const doFavorite = async (): Promise<void> => {
    const input = { blockId: pageId, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
    if (pageId === id) {
      await pinClient.refetchQueries({ include: [queryBlockInfo] })
    }
    setDropdownVisible(false)
    removeSelectedKey()
  }

  const onDropdownVisibleChange = (value: boolean): void => {
    setDropdownVisible(value)
    if (value) {
      addSelectedKey()
    } else {
      removeSelectedKey()
    }
  }

  const inputRef = React.useRef<any>(null)
  const renamePopoverContent = (
    <Input
      prefix={<Edit />}
      disabled={renameBlockLoading}
      size="small"
      bordered={false}
      onPressEnter={onRename}
      ref={inputRef}
      defaultValue={titleText}
    />
  )

  const onClickMenu = (): MenuProps['onClick'] => {
    return async ({ key }) => {
      switch (key) {
        case 'delete':
          void deletePage()
          break
        case 'copy_link':
          void doCopyLink()
          break
        case 'duplicate':
          void duDuplicate()
          break
        case 'rename':
          // TODO focus and select all
          // inputRef.current.focus({ preventScroll: true })
          break
        case 'favorite':
          void doFavorite()
          break
        default:
          console.log(`unknown key ${key}`)
          break
      }
    }
  }

  const onRenamePopoverVisibleChange = (value: boolean): void => {
    setPopoverVisible(value)

    if (value) {
      setDropdownVisible(false)
      removeSelectedKey()
      // TODO focus and select all
      // inputRef.current.focus({ preventScroll: true })
    }
  }

  const menu = (
    <Menu onClick={onClickMenu()}>
      <Menu.Item key="favorite" icon={pin ? <CheckOneFill /> : <Star />} disabled={blockPinLoading}>
        {t(pin ? 'pin.remove' : 'pin.add')}
      </Menu.Item>
      <Menu.Item key="copy_link" icon={copied ? <Check /> : <LinkIcon />}>
        {t(copied ? 'copy_link.copied' : 'copy_link.button')}
      </Menu.Item>
      <Menu.Item key="duplicate" icon={<Copy />} disabled={blockDuplicateLoading}>
        {t('duplicate.button')}
      </Menu.Item>
      <Menu.Item key="rename" icon={<Edit />} disabled={renameBlockLoading}>
        <Popover
          content={renamePopoverContent}
          title={null}
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={onRenamePopoverVisibleChange}>
          {t('blocks.rename')}
        </Popover>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item danger key="delete" icon={<Delete />} disabled={blockDeleteLoading}>
        {t('blocks.delete')}
      </Menu.Item>
    </Menu>
  )

  const linkData = (
    <Link to={linkPath} className={styles.title}>
      {title}
    </Link>
  )

  return (
    <>
      <Dropdown trigger={['contextMenu']} overlay={menu} visible={dropdownVisible} onVisibleChange={onDropdownVisibleChange}>
        <div className={styles.menu}>
          {linkData}
          <Tooltip title={t('blocks.more')}>
            <Button className={styles.moreBtn} type="text" onClick={onClickMoreButton}>
              <More />
            </Button>
          </Tooltip>
          <Tooltip title={t('blocks.create_sub_pages')}>
            <Button className={styles.addBtn} type="text" onClick={onClickPlus} loading={createBlockLoading} disabled={createBlockLoading}>
              <Add />
            </Button>
          </Tooltip>
        </div>
      </Dropdown>
    </>
  )
}
