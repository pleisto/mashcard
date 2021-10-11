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

interface SnapshotListProps {
  blockId: string
  webid: string
  currentVersion: number | undefined
  setCurrentVersion: React.Dispatch<React.SetStateAction<number | undefined>>
  confirmLoading: boolean
  setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>
  onCleanup: () => void
}

export const SnapshotList: React.FC<SnapshotListProps> = ({
  blockId,
  webid,
  currentVersion,
  setCurrentVersion,
  confirmLoading,
  onCleanup,
  setConfirmLoading
}) => {
  const { t } = useDocsI18n()
  const { data } = useGetBlockSnapshotsQuery({ variables: { id: blockId } })
  const [snapshotRestore] = useSnapshotRestoreMutation({ refetchQueries: [queryChildrenBlocks] })
  const [onCommit] = useSyncProvider()

  const onRestore = async (): Promise<void> => {
    setConfirmLoading(true)
    const input: SnapshotRestoreInput = { blockId, snapshotVersion: currentVersion as number }
    await snapshotRestore({ variables: { input } })
    onCleanup()
  }

  const skelecton = (page: any, snapshots: any, disabled: boolean): any => {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>{page}</div>
        </div>
        <div className={styles.side}>
          <div className={styles.snapshot}>{snapshots}</div>
          <div className={styles.actionPanel}>
            <Button type="primary" className={styles.button} disabled={disabled} onClick={onRestore}>
              {t('snapshots.restore')}
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
            <span className={styles.title}>{item.name}</span>
            <span className={styles.desc}>{item.relativeTime}</span>
          </Button>
        </List.Item>
      )}
    />
  )

  return skelecton(
    <div className={styles.page}>
      <DocumentPage
        webid={webid}
        docid={blockId}
        editable={false}
        snapshotVersion={currentVersion ?? firstVersion}
        onCommit={onCommit}
        viewable={true}
      />
    </div>,
    snapshotData,
    !currentVersion || confirmLoading
  )
}
