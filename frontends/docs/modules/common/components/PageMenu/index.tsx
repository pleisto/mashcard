import React from 'react'

import { Dropdown, Menu, MenuProps } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import {
  useBlockDeleteMutation,
  BlockDeleteInput,
  useBlockCreateSnapshotMutation,
  BlockCreateSnapshotInput,
  Scalars
} from '@/BrickdocGraphQL'
import SnapshotList from '../SnapshotList'

type UUID = Scalars['UUID']

interface PageMenuProps {
  webid: string
  id: UUID
  title: Scalars['String']
  parentId?: UUID
}

const PageMenu: React.FC<PageMenuProps> = props => {
  const [blockDelete] = useBlockDeleteMutation()
  const deletePage = (id: UUID): void => {
    const input: BlockDeleteInput = { id }
    void blockDelete({ variables: { input } })
  }
  const [blockCreateSnapshot] = useBlockCreateSnapshotMutation()
  const createSnapshot = (id: UUID): void => {
    const input: BlockCreateSnapshotInput = { id }
    void blockCreateSnapshot({ variables: { input } })
  }
  const { t } = useDocsI18n()

  const rollbackSnapshot = (version: number): void => {
    console.log(`rollback snapshot ${version}`)
  }

  const link = <Link to={`/${props.webid}/${props.id}`}>{props.title}</Link>
  if (props.parentId) {
    return link
  }

  const onClick = (id: UUID): MenuProps['onClick'] => {
    return ({ key }) => {
      switch (key) {
        case 'create_snapshot':
          createSnapshot(id)
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
  const menu = (
    <Menu onClick={onClick(props.id)}>
      <Menu.Item key="create_snapshot">{t('blocks.create_snapshot')}</Menu.Item>
      <Menu.Item danger key="delete">
        {t('blocks.delete')}
      </Menu.Item>
      <Menu.Divider />
      <SnapshotList id={props.id} webid={props.webid} />
    </Menu>
  )
  return (
    <Dropdown mouseEnterDelay={1} overlay={menu}>
      {link}
    </Dropdown>
  )
}

export default PageMenu
