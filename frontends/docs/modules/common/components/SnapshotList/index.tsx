import React from 'react'
import { useGetBlockSnapshotsQuery, BlockSnapshot } from '@/BrickdocGraphQL'
import { Menu } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { Link } from 'react-router-dom'

interface SnapshotListProps {
  id: string
  webid: string
}

const { SubMenu } = Menu

const SnapshotList: React.FC<SnapshotListProps> = props => {
  const { t } = useDocsI18n()

  const { data, loading } = useGetBlockSnapshotsQuery({ variables: { id: props.id } })
  if (loading) {
    return <Menu.Divider />
  }

  if (data.blockSnapshots?.length === 0) {
    return <SubMenu title={t('snapshots.name')} disabled />
  }

  const subMenus = data.blockSnapshots?.map((snapshot: BlockSnapshot) => (
    <Menu.Item key={`snapshot-${snapshot.snapshotVersion}`}>
      <Link to={`/${props.webid}/${props.id}/${snapshot.snapshotVersion}`}> {snapshot.name} </Link>
    </Menu.Item>
  ))

  return <SubMenu title={t('snapshots.name')}>{subMenus}</SubMenu>
}

export default SnapshotList
