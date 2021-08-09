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
import { queryBlockSnapshots, queryPageBlocks } from '../../graphql'

type UUID = Scalars['UUID']

interface PageMenuProps {
  webid: string
  id: UUID
  title: Scalars['String']
  text: Scalars['String'] | null
  parentId: UUID | null
}

export const PageMenu: React.FC<PageMenuProps> = props => {
  const [blockId, setBlockId] = useState<string | undefined>()
  const [shareLinkModalVisible, setShareLinkModalVisible] = useState<boolean>(false)

  const [blockDelete, { loading: deleteLoading, client: deleteClient }] = useBlockDeleteMutation()
  const deletePage = async (id: UUID): Promise<void> => {
    const input: BlockDeleteInput = { id }
    await blockDelete({ variables: { input } })
    void deleteClient.refetchQueries({ include: [queryPageBlocks] })
  }
  const [blockCreateSnapshot, { client: snapshotClient }] = useBlockCreateSnapshotMutation()
  const createSnapshot = async (id: UUID): Promise<void> => {
    const input: BlockCreateSnapshotInput = { id }
    await blockCreateSnapshot({ variables: { input } })
    void snapshotClient.refetchQueries({ include: [queryBlockSnapshots] })
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

  const onClick = (id: UUID): MenuProps['onClick'] => {
    return ({ key }) => {
      switch (key) {
        case 'create_snapshot':
          void createSnapshot(id)
          break
        case 'create_share_link':
          void createShareLink(id)
          break
        case 'delete':
          void deletePage(id)
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

  const link = props.parentId ? `/${props.webid}/p/${props.parentId}#${props.id}` : `/${props.webid}/p/${props.id}`

  return (
    <>
      <Dropdown mouseEnterDelay={1} overlay={menu}>
        <Link to={link}>{props.title}</Link>
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
