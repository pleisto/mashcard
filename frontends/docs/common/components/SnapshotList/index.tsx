import React from 'react'
import cx from 'classnames'
import { Button, List } from '@brickdoc/design-system'
import { DocumentPage } from '@/docs/pages/DocumentPage'
import { SnapshotRestoreInput, useGetBlockSnapshotsQuery, useSnapshotRestoreMutation } from '@/BrickdocGraphQL'
import styles from './index.module.less'
import { useDocsI18n } from '../../hooks'
import Pic from '@/common/assets/cloud_brain_2.svg'
import { queryChildrenBlocks } from '@/docs/pages/graphql'
import { useSyncProvider } from '@/docs/pages/hooks'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'

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
  const [snapshotRestore, { loading }] = useSnapshotRestoreMutation({ refetchQueries: [queryChildrenBlocks] })
  const [onCommit] = useSyncProvider()

  const onRestore = async (): Promise<void> => {
    setConfirmLoading(true)
    const input: SnapshotRestoreInput = { blockId: docMeta.id, snapshotVersion: currentVersion as number }
    await snapshotRestore({ variables: { input } })
    onCleanup()
  }

  const skelecton = (page: any, snapshots: any, disabled: boolean): any => {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>{page}</div>
        <div className={styles.side}>
          <div className={styles.snapshot}>{snapshots}</div>
          <div className={styles.actionPanel}>
            <Button type="primary" className={styles.button} disabled={disabled} loading={loading} onClick={onRestore}>
              {loading ? t('snapshots.restoring') : t('snapshots.restore')}
            </Button>
            <Button className={styles.button} onClick={onCleanup}>
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
        <img className={styles.image} src={Pic} alt="cloud_brain_2" />
        <br />
        <span className={styles.text}>{t('snapshots.empty')}</span>
      </div>,
      <>&nbsp;</>,
      true
    )
  }

  const dataSource = data.blockSnapshots

  const firstVersion = Math.max(...data.blockSnapshots.map(snapshot => snapshot.snapshotVersion))

  const snapshotData = (
    <List
      size="small"
      footer={null}
      header={null}
      dataSource={dataSource}
      split={false}
      renderItem={item => (
        <List.Item className={cx(styles.listItem, { [styles.active]: item.snapshotVersion === currentVersion })}>
          <Button type="text" className={styles.item} onClick={() => setCurrentVersion(item.snapshotVersion)}>
            <span className={styles.title}>{item.name || t('title.untitled')}</span>
            <span className={styles.desc}>{item.relativeTime}</span>
          </Button>
        </List.Item>
      )}
    />
  )

  return skelecton(
    <div className={styles.page}>
      <DocumentPage
        docMeta={{ ...docMeta, snapshotVersion: currentVersion ?? firstVersion, editable: false, viewable: true }}
        onCommit={onCommit}
      />
    </div>,
    snapshotData,
    !currentVersion || confirmLoading
  )
}
