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

export const SnapshotList: React.FC<SnapshotListProps> = props => {
  const { t } = useDocsI18n()

  const { data } = useGetBlockSnapshotsQuery({ variables: { id: props.id } })

  if (!data?.blockSnapshots || data.blockSnapshots.length === 0) {
    return <SubMenu title={t('snapshots.name')} disabled />
  }

  const subMenus = data.blockSnapshots.map((snapshot: BlockSnapshot) => (
    <Menu.Item key={`snapshot-${snapshot.snapshotVersion}`}>
      <Link to={`/${props.webid}/p/${props.id}/s/${snapshot.snapshotVersion}`}> {snapshot.name} </Link>
    </Menu.Item>
  ))

  return <SubMenu title={t('snapshots.name')}>{subMenus}</SubMenu>
}
