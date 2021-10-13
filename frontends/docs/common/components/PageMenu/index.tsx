import React, { useContext } from 'react'
import { Button, Dropdown, Input, Menu, MenuProps, message, Popover, Tooltip } from '@brickdoc/design-system'
import { Link, useHistory } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import {
  useBlockSoftDeleteMutation,
  BlockSoftDeleteInput,
  Scalars,
  useBlockCreateMutation,
  useBlockRenameMutation,
  useBlockPinOrUnpinMutation
} from '@/BrickdocGraphQL'
import { queryBlockPins, queryPageBlocks } from '../../graphql'
import { queryBlockInfo, queryChildrenBlocks } from '@/docs/pages/graphql'
import { Add, CheckOneFill, Delete, Edit, Link as LinkIcon, More, Star } from '@brickdoc/design-system/components/icon'
import styles from './styles.module.less'
import { BrickdocContext } from '@/BrickdocPWA'

type UUID = Scalars['UUID']

interface PageMenuProps {
  webid: string
  id: UUID
  title: Scalars['String']
  enableMenu: boolean
  titleText: string
  pin: boolean
  docid: string | undefined
}

export const PageMenu: React.FC<PageMenuProps> = ({ docid, webid, id, pin, enableMenu, title, titleText }) => {
  const [blockSoftDelete] = useBlockSoftDeleteMutation({ refetchQueries: [queryPageBlocks, queryChildrenBlocks] })
  const history = useHistory()
  const [dropdownVisible, setDropdownVisible] = React.useState(false)
  const [popoverVisible, setPopoverVisible] = React.useState(false)

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockRename, { loading: renameBlockLoading, client: renameClient }] = useBlockRenameMutation({
    refetchQueries: [queryPageBlocks]
  })

  const [blockPinOrUnpin, { client: pinClient }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })

  const deletePage = async (id: UUID): Promise<void> => {
    const input: BlockSoftDeleteInput = { id }
    await blockSoftDelete({ variables: { input } })
  }

  const onClickPlus = async (event: { stopPropagation: () => any }): Promise<void> => {
    void event.stopPropagation()
    const input = { parentId: id, title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      history.push(`/${webid}/p/${data?.blockCreate?.id}`)
    }
  }

  const { t } = useDocsI18n()
  const { host } = useContext(BrickdocContext)
  const link = `${host}/${webid}/p/${id}`

  const onClickAddButton = (e: { preventDefault: () => void; stopPropagation: () => void }): void => {
    e.preventDefault()
    e.stopPropagation()
    setDropdownVisible(true)
  }

  const onRename = async (e: any): Promise<void> => {
    const input = { id, title: e.target.value }
    await blockRename({ variables: { input } })
    if (id === docid) {
      await renameClient.refetchQueries({ include: [queryChildrenBlocks] })
    }
    setPopoverVisible(false)
  }

  const doCopyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(link)
    void message.success(t('blocks.copy_link_hint'))
    setDropdownVisible(false)
  }

  const doFavorite = async (): Promise<void> => {
    const input = { blockId: id, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
    if (id === docid) {
      await pinClient.refetchQueries({ include: [queryBlockInfo] })
    }
    setDropdownVisible(false)
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
          void deletePage(id)
          break
        case 'copy_link':
          void doCopyLink()
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
      // TODO focus and select all
      // inputRef.current.focus({ preventScroll: true })
    }
  }

  const menu = (
    <Menu onClick={onClickMenu()}>
      <Menu.Item key="copy_link" icon={<LinkIcon />}>
        {t('blocks.copy_link')}
      </Menu.Item>
      <Menu.Item key="favorite" icon={pin ? <CheckOneFill /> : <Star />}>
        {t(pin ? 'pin.remove' : 'pin.add')}
      </Menu.Item>
      <Menu.Item key="rename" icon={<Edit />}>
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
      <Menu.Item danger key="delete" icon={<Delete />}>
        {t('blocks.delete')}
      </Menu.Item>
    </Menu>
  )

  const linkData = <Link to={`/${webid}/p/${id}`}>{title}</Link>
  if (!enableMenu) {
    return (
      <>
        <div className={styles.menu}>{linkData}</div>
      </>
    )
  }

  return (
    <>
      <Dropdown trigger={['contextMenu']} overlay={menu} visible={dropdownVisible} onVisibleChange={setDropdownVisible}>
        <div className={styles.menu}>
          {linkData}
          <Tooltip title={t('blocks.more')}>
            <Button className={styles.moreBtn} type="text" onClick={onClickAddButton}>
              <More />
            </Button>
          </Tooltip>
          <Tooltip title={t('blocks.create_pages')}>
            <Button className={styles.addBtn} type="text" onClick={onClickPlus} loading={createBlockLoading} disabled={createBlockLoading}>
              <Add />
            </Button>
          </Tooltip>
        </div>
      </Dropdown>
    </>
  )
}
