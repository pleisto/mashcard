import { Block, GetTrashBlocksQueryVariables, useGetTrashBlocksQuery } from '@/BrickdocGraphQL'
import { Skeleton, useList } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { BlockListItem } from '../BlockListItem'
import { List, Item, NotFound } from './PageTrash.style'

interface PageTrashProps {
  domain: string
  docid: string | null
  search: string | undefined
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageTrash: React.FC<PageTrashProps> = ({ domain, docid, search, visible, setVisible }) => {
  const { t } = useDocsI18n()
  const { list, getKey, addList } = useList<Block>()

  const input: GetTrashBlocksQueryVariables = React.useMemo(
    () => ({
      domain,
      blockId: docid ?? undefined,
      search
    }),
    [docid, search, domain]
  )

  const { data, loading, refetch } = useGetTrashBlocksQuery({ variables: input })

  React.useEffect(() => {
    addList(data?.trashBlocks as Block[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  React.useEffect(() => {
    if (visible) {
      void refetch()
    }
  }, [refetch, visible])

  if (loading) {
    return <Skeleton type="list" />
  }

  if (!data?.trashBlocks?.length) {
    return <NotFound>{t('trash.not_found')}</NotFound>
  }

  return (
    <List>
      {list.map((item: Block, index: number) => (
        <Item key={getKey(index)}>
          <BlockListItem domain={domain} block={item} setVisible={setVisible} />
        </Item>
      ))}
    </List>
  )
}
