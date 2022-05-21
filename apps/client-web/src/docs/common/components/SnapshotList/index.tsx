import React from 'react'
import { Button, cx, useList } from '@brickdoc/design-system'
import { DocumentPage } from '@/docs/pages/DocumentPage'
import { SnapshotRestoreInput, useGetBlockSnapshotsQuery, useSnapshotRestoreMutation } from '@/BrickdocGraphQL'
import { useDocsI18n } from '../../hooks'
import Pic from '@/common/assets/cloud_brain_2.svg'
import { queryBlockInfo, queryChildrenBlocks } from '@/docs/pages/graphql'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import * as Root from './index.style'

interface SnapshotListProps {
  docMeta: NonNullDocMeta
  currentVersion: number | undefined
  setCurrentVersion: React.Dispatch<React.SetStateAction<number | undefined>>
  confirmLoading: boolean
  setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>
  onCleanup: () => void
}

export const SnapshotList: React.FC<SnapshotListProps> = ({
  docMeta,
  currentVersion,
  setCurrentVersion,
  confirmLoading,
  onCleanup,
  setConfirmLoading
}) => {
  const { t } = useDocsI18n()
  const { data } = useGetBlockSnapshotsQuery({ variables: { id: docMeta.id } })
  const { list, getKey } = useList(data?.blockSnapshots ?? [])
  const [snapshotRestore, { loading }] = useSnapshotRestoreMutation({
    refetchQueries: [queryChildrenBlocks, queryBlockInfo]
  })

  const onRestore = async (): Promise<void> => {
    setConfirmLoading(true)
    const input: SnapshotRestoreInput = { blockId: docMeta.id, snapshotVersion: currentVersion as number }
    await snapshotRestore({ variables: { input } })
    onCleanup()
  }

  const skelecton = (page: any, snapshots: any, disabled: boolean): React.ReactElement => {
    return (
      <div className={Root.container}>
        <div className="contentWrapper">{page}</div>
        <div className="side">
          <div className={Root.snapshot}>{snapshots}</div>
          <div className="actionPanel">
            <Button className="button" type="secondary" disabled={disabled} loading={loading} onClick={onRestore} block>
              {loading ? t('snapshots.restoring') : t('snapshots.restore')}
            </Button>
            <Button className="button" onClick={onCleanup} block>
              {t('snapshots.cancel')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data?.blockSnapshots || data.blockSnapshots.length === 0) {
    return skelecton(
      <div>
        <img className={Root.image} src={Pic} alt="cloud_brain_2" />
        <br />
        <span className={Root.text}>{t('snapshots.empty')}</span>
      </div>,
      <>&nbsp;</>,
      true
    )
  }

  const firstVersion = Math.max(...data.blockSnapshots.map(snapshot => snapshot.snapshotVersion))

  const snapshotTitle = (
    <div className={Root.topBar}>
      <p>{docMeta.title}</p>
    </div>
  )

  const snapshotData = (
    <Root.List>
      {list.map((item: any, index: number) => (
        <li key={getKey(index)} className={cx(Root.listItem, { active: item.snapshotVersion === currentVersion })}>
          <Button type="text" className={Root.item} onClick={() => setCurrentVersion(item.snapshotVersion)}>
            <span className="title">{item.name || t('title.untitled')}</span>
            <span className="desc">{item.relativeTime}</span>
          </Button>
        </li>
      ))}
    </Root.List>
  )

  return skelecton(
    <div className={Root.page}>
      {snapshotTitle}
      <DocumentPage
        mode="presentation"
        docMeta={{ ...docMeta, snapshotVersion: currentVersion ?? firstVersion, editable: false, viewable: true }}
      />
    </div>,
    snapshotData,
    !currentVersion || confirmLoading
  )
}
