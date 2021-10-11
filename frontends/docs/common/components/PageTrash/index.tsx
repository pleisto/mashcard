import { Block, useGetTrashBlocksQuery } from '@/BrickdocGraphQL'
import { List, Skeleton } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { BlockListItem } from '../BlockListItem'
import styles from './PageTrash.module.css'

interface PageTrashProps {
  webid: string
  docid: string | null
  search: string | undefined
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageTrash: React.FC<PageTrashProps> = ({ webid, docid, search, setVisible }) => {
  const { t } = useDocsI18n()

  const input: any = { webid }
  if (docid) {
    input.blockId = docid
  }
  if (search) {
    input.search = search
  }
  const { data, loading } = useGetTrashBlocksQuery({ variables: input })

  if (loading) {
    return <Skeleton />
  }

  if (!data?.trashBlocks?.length) {
    return t('trash.not_found')
  }

  return (
    <List
      className={styles.list}
      size="small"
      split={false}
      footer={null}
      header={null}
      dataSource={data.trashBlocks as Block[]}
      renderItem={(item: Block) => {
        return (
          <List.Item className={styles.item}>
            <BlockListItem webid={webid} block={item} setVisible={setVisible} />
          </List.Item>
        )
      }}
    />
  )
}
