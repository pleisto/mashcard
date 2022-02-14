import { Block, GetTrashBlocksQueryVariables, useGetTrashBlocksQuery } from '@/BrickdocGraphQL'
import { DeprecatedList, DeprecatedSkeleton } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { BlockListItem } from '../BlockListItem'
import styles from './PageTrash.module.css'

interface PageTrashProps {
  webid: string
  docid: string | null
  search: string | undefined
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageTrash: React.FC<PageTrashProps> = ({ webid, docid, search, visible, setVisible }) => {
  const { t } = useDocsI18n()

  const input: GetTrashBlocksQueryVariables = React.useMemo(
    () => ({
      webid,
      blockId: docid ?? undefined,
      search
    }),
    [docid, search, webid]
  )

  const { data, loading, refetch } = useGetTrashBlocksQuery({ variables: input })

  React.useEffect(() => {
    if (visible) {
      void refetch()
    }
  }, [refetch, visible])

  if (loading) {
    return <DeprecatedSkeleton active />
  }

  if (!data?.trashBlocks?.length) {
    return <p className={styles.notFound}>{t('trash.not_found')}</p>
  }

  return (
    <DeprecatedList
      className={styles.list}
      size="small"
      split={false}
      footer={null}
      header={null}
      dataSource={data.trashBlocks as Block[]}
      renderItem={(item: Block) => {
        return (
          <DeprecatedList.Item key={item.id} className={styles.item}>
            <BlockListItem webid={webid} block={item} setVisible={setVisible} />
          </DeprecatedList.Item>
        )
      }}
    />
  )
}
