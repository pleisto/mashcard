import React, { useState } from 'react'
import { Dropdown, Menu, MenuProps, Skeleton } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import {
  useBlockDeleteMutation,
  BlockDeleteInput,
  useBlockCreateSnapshotMutation,
  BlockCreateSnapshotInput,
  Scalars
} from '@/BrickdocGraphQL'
import { SnapshotList } from '../SnapshotList'
import { ShareLinkModal } from '../ShareLinkModal'

type UUID = Scalars['UUID']

interface PageMenuProps {
  webid: string
  id: UUID
  title: Scalars['String']
  text: Scalars['String'] | null
  parentId: UUID | null
}

export const PageMenu: React.FC<PageMenuProps> = props => {
  const [blockDelete, { loading: deleteLoading }] = useBlockDeleteMutation()
  const [blockId, setBlockId] = useState<string | undefined>()
  const [shareLinkModalVisible, setShareLinkModalVisible] = useState<boolean>(false)

  const deletePage = (id: UUID): void => {
    const input: BlockDeleteInput = { id }
    void blockDelete({ variables: { input } })
    globalThis.location.href = `/${props.webid}`
  }
  const [blockCreateSnapshot] = useBlockCreateSnapshotMutation()
  const createSnapshot = (id: UUID): void => {
    const input: BlockCreateSnapshotInput = { id }
    void blockCreateSnapshot({ variables: { input } })
  }

  const createShareLink = (id: UUID): void => {
    setShareLinkModalVisible(true)
    setBlockId(id)
  }
  const { t } = useDocsI18n()

  if (deleteLoading) {
    return <Skeleton />
  }

  const rollbackSnapshot = (version: number): void => {
    console.log(`rollback snapshot ${version}`)
  }

  if (props.parentId) {
    return <Link to={`/${props.webid}/p/${props.parentId}#${props.id}`}>{props.title}</Link>
  }

  const onClick = (id: UUID): MenuProps['onClick'] => {
    return ({ key }) => {
      switch (key) {
        case 'create_snapshot':
          createSnapshot(id)
          break
        case 'create_share_link':
          createShareLink(id)
          break
        case 'delete':
          deletePage(id)
          break
        default:
          if (key.startsWith('snapshot-')) {
            rollbackSnapshot(Number(key.replace('snapshot-', '')))
          } else {
            console.log(`unknown key ${key}`)
          }

          break
      }
    }
  }

  // Hide if is not page block
  const shareLinkItem = props.parentId ? <></> : <Menu.Item key="create_share_link">{t('blocks.create_share_link')}</Menu.Item>

  const menu = (
    <Menu onClick={onClick(props.id)}>
      <Menu.Item key="create_snapshot">{t('blocks.create_snapshot')}</Menu.Item>
      {shareLinkItem}
      <Menu.Item danger key="delete">
        {t('blocks.delete')}
      </Menu.Item>
      <Menu.Divider />
      <SnapshotList id={props.id} webid={props.webid} />
    </Menu>
  )
  return (
    <>
      <Dropdown mouseEnterDelay={1} overlay={menu}>
        <Link to={`/${props.webid}/p/${props.id}`}>{props.title}</Link>
      </Dropdown>
      <ShareLinkModal
        title={t('blocks.create_share_link')}
        blockId={blockId}
        visible={shareLinkModalVisible}
        setVisible={setShareLinkModalVisible}
      />
    </>
  )
}
