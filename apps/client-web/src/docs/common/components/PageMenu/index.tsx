import React from 'react'
import {
  Button,
  Dropdown,
  Icon,
  Input,
  Menu,
  MenuProps,
  toast,
  Popover,
  Tooltip,
  devWarning
} from '@brickdoc/design-system'
import { Link, useNavigate } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import {
  useBlockSoftDeleteMutation,
  Scalars,
  useBlockCreateMutation,
  useBlockRenameMutation,
  useBlockPinOrUnpinMutation,
  useBlockDuplicateMutation
} from '@/BrickdocGraphQL'
import { queryBlockPins, queryPageBlocks, queryTrashBlocks } from '../../graphql'
import styles from './styles.module.less'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import { editorVar, FormulaContextVar } from '@/docs/reactiveVars'
import { appendFormulas } from '@brickdoc/formula'
import { useFormulaActions } from '@/docs/pages/hooks/useFormulaActions'

type UUID = Scalars['UUID']

interface DocMeta {
  id?: string | undefined
  domain: string
  host: string
}

interface PageMenuProps {
  mutable?: boolean
  docMeta: DocMeta
  pageId: UUID
  title: Scalars['String']
  // setPopoverKey: React.Dispatch<React.SetStateAction<string | undefined>>
  titleText: string
  pin: boolean
  parentId?: string | null
  nearNodeId?: string
}

export const PageMenu: React.FC<PageMenuProps> = ({
  docMeta: { id, domain, host },
  // setPopoverKey,
  pageId,
  mutable = true,
  pin,
  title,
  titleText,
  parentId,
  nearNodeId
}) => {
  const navigate = useNavigate()
  const client = useApolloClient()
  const editor = useReactiveVar(editorVar)
  const formulaContext = useReactiveVar(FormulaContextVar)

  const [popoverVisible, setPopoverVisible] = React.useState(false)
  const [dropdownVisible, setDropdownVisible] = React.useState(false)
  const [copied, setCopied] = React.useState<boolean>(false)

  const [blockSoftDelete, { loading: blockDeleteLoading }] = useBlockSoftDeleteMutation({
    refetchQueries: [queryPageBlocks, queryTrashBlocks]
  })

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
    const input = { id: pageId, hardDelete: false }
    await blockSoftDelete({ variables: { input } })
    if (pageId === id) {
      client.cache.modify({
        id: client.cache.identify({ __typename: 'BlockInfo', id }),
        fields: {
          isDeleted() {
            return true
          }
        }
      })
    }
    if (nearNodeId) {
      navigate(`/${domain}/${nearNodeId}`)
      return
    }
    if (parentId) {
      navigate(`/${domain}/${parentId}`)
      return
    }
    const newPageInput = { title: '' }
    const { data } = await blockCreate({ variables: { input: newPageInput } })
    if (data?.blockCreate?.id) {
      navigate(`/${domain}/${data?.blockCreate?.id}`)
    }
  }

  const onPressAddSubPage = async (): Promise<void> => {
    const input = { parentId: pageId, title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      navigate(`/${domain}/${data?.blockCreate?.id}`)
    }
  }

  const { t } = useDocsI18n()
  const linkPath = `/${domain}/${pageId}`
  const link = `${host}${linkPath}`

  /* const addSelectedKey = (): void => {
*   setPopoverKey(pageId)
* }

* const removeSelectedKey = (): void => {
*   setPopoverKey(undefined)
* } */

  const onClickMoreButton = (e: { preventDefault: () => void; stopPropagation: () => void }): void => {
    e.preventDefault()
    e.stopPropagation()
    setDropdownVisible(true)
    // addSelectedKey()
  }

  const onRename = async (e: any): Promise<void> => {
    const title = e?.target?.value
    const input = { id: pageId, title }
    await blockRename({ variables: { input } })
    if (pageId === id) {
      if (editor && !editor.isDestroyed) {
        editor.commands.setDocAttrs({ ...editor.state.doc.attrs, title })
      }

      client.cache.modify({
        id: client.cache.identify({ __typename: 'BlockInfo', id }),
        fields: {
          title() {
            return title
          }
        }
      })
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
  const renamePopoverContent = (
    <Input
      prefix={<Icon.Edit />}
      disabled={renameBlockLoading}
      size="sm"
      bordered={false}
      onPressEnter={onRename}
      onBlur={onRename}
      ref={inputRef}
      defaultValue={titleText}
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
      placement="bottom"
      trigger="customEvent"
      visible={popoverVisible}
      onVisibleChange={onRenamePopoverVisibleChange}
      destroyTooltipOnHide={true}
      className={styles.title}
    >
      <Link to={linkPath}>{title}</Link>
    </Popover>
  )

  if (!mutable) {
    return <div className={styles.menu}>{linkData}</div>
  }

  return (
    <>
      <Dropdown
        trigger={['contextMenu']}
        overlay={menu}
        destoryPopupOnHide={true}
        visible={dropdownVisible}
        onVisibleChange={onDropdownVisibleChange}
      >
        <div className={styles.menu}>
          {linkData}
          <div>
            <Tooltip title={t('blocks.more')}>
              <Button className={styles.moreBtn} type="text" onClick={onClickMoreButton}>
                <Icon.More />
              </Button>
            </Tooltip>
            <Tooltip title={t('blocks.create_sub_pages')}>
              <Button
                className={styles.addBtn}
                type="text"
                onClick={onPressAddSubPage}
                loading={createBlockLoading}
                disabled={createBlockLoading}
              >
                <Icon.Add />
              </Button>
            </Tooltip>
          </div>
        </div>
      </Dropdown>
    </>
  )
}
