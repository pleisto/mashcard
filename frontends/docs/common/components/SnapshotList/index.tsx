import React from 'react'
import { Button, cx, useList } from '@brickdoc/design-system'
import { DocumentPage } from '@/docs/pages/DocumentPage'
import { SnapshotRestoreInput, useGetBlockSnapshotsQuery, useSnapshotRestoreMutation } from '@/BrickdocGraphQL'
import styles from './index.module.less'
import { useDocsI18n } from '../../hooks'
import Pic from '@/common/assets/cloud_brain_2.svg'
import { queryBlockInfo, queryChildrenBlocks } from '@/docs/pages/graphql'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { List } from './index.style'

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
      <div className={styles.container}>
        <div className={styles.contentWrapper}>{page}</div>
        <div className={styles.side}>
          <div className={styles.snapshot}>{snapshots}</div>
          <div className={styles.actionPanel}>
            <Button
              className={styles.button}
              type="secondary"
              disabled={disabled}
              loading={loading}
              onClick={onRestore}
              block
            >
              {loading ? t('snapshots.restoring') : t('snapshots.restore')}
            </Button>
            <Button className={styles.button} onClick={onCleanup} block>
              {t('snapshots.cancel')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data?.blockSnapshots || data.blockSnapshots.length === 0) {
    return skelecton(
      <div className={styles.skelectonWarp}>
        <img className={styles.image} src={Pic} alt="cloud_brain_2" />
        <br />
        <span className={styles.text}>{t('snapshots.empty')}</span>
      </div>,
      <>&nbsp;</>,
      true
    )
  }

  const firstVersion = Math.max(...data.blockSnapshots.map(snapshot => snapshot.snapshotVersion))

  const snapshotTitle = (
    <div className={styles.topBar}>
      <p>{docMeta.title}</p>
    </div>
  )

  const snapshotData = (
    <List>
      {list.map((item: any, index: number) => (
        <li
          key={getKey(index)}
          className={cx(styles.listItem, { [styles.active]: item.snapshotVersion === currentVersion })}
        >
          <Button type="text" className={styles.item} onClick={() => setCurrentVersion(item.snapshotVersion)}>
            <span className={styles.title}>{item.name || t('title.untitled')}</span>
            <span className={styles.desc}>{item.relativeTime}</span>
          </Button>
        </li>
      ))}
    </List>
  )

  return skelecton(
    <div className={styles.page}>
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
