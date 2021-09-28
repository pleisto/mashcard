import { Block, useGetTrashBlocksQuery } from '@/BrickdocGraphQL'
import { List } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { BlockListItem } from '../BlockListItem'

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
  const { data } = useGetTrashBlocksQuery({ variables: input })

  if (!data?.trashBlocks?.length) {
    return <>{t('trash.not_found')}</>
  }

  return (
    <List
      size="small"
      footer={null}
      header={null}
      dataSource={data.trashBlocks as Block[]}
      renderItem={(item: Block) => {
        return (
          <List.Item>
            <BlockListItem webid={webid} block={item} setVisible={setVisible} />
          </List.Item>
        )
      }}
    />
  )
}
