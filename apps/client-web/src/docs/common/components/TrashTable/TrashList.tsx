import {
  Block,
  GetTrashBlocksQueryVariables,
  useGetTrashBlocksQuery,
  useBlockRestoreMutation,
  useBlockHardDeleteMutation
} from '@/BrickdocGraphQL'
import { Spin, useList, Checkbox, Button, theme, ConfirmDialog } from '@brickdoc/design-system'
import React, { useCallback, useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { TrashItem } from './TrashItem'
import { Card, Delete, Undo } from '@brickdoc/design-icons'
import { queryPageBlocks, queryTrashBlocks } from '../../graphql'
import { useApolloClient } from '@apollo/client'
import { List, Item, NotFound, Page, Time, Action, SelectBlock, SelectedBar } from './Trash.style'

interface PageTrashProps {
  domain: string
  keyword: string | undefined
}

export interface BlockWithChecked extends Block {
  checked?: boolean
}

export const PageTrash: React.FC<PageTrashProps> = ({ domain, keyword }) => {
  const { t } = useDocsI18n()
  const client = useApolloClient()
  const { list, getKey, addList, resetList, replace } = useList<BlockWithChecked>()

  const input: GetTrashBlocksQueryVariables = React.useMemo(
    () => ({
      domain,
      search: keyword
    }),
    [keyword, domain]
  )

  const { data, loading: listLoading } = useGetTrashBlocksQuery({ variables: input })
  const [actionLoading, setActionLoading] = useState(false)
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState(false)

  React.useEffect(() => {
    resetList([])
    addList(data?.trashBlocks as BlockWithChecked[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const selectedItem = list.filter(item => item.checked)
  const selectedNum = selectedItem.length
  const indeterminate = selectedNum !== list.length

  const [blockHardDelete] = useBlockHardDeleteMutation({ refetchQueries: [queryTrashBlocks] })
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryTrashBlocks, queryPageBlocks] })

  const onBatchDelete = useCallback(
    async (_ids?: string[]) => {
      const ids = _ids ?? selectedItem.map(item => item.id)
      setActionLoading(true)
      await blockHardDelete({ variables: { input: { ids } } })
      const nextList = list.filter(item => !ids.includes(item.id))
      resetList(nextList)
      setActionLoading(false)
    },
    [selectedItem, blockHardDelete, list, resetList]
  )

  const onBatchRestore = useCallback(
    async (_ids?: string[]) => {
      const ids = _ids ?? selectedItem.map(item => item.id)
      setActionLoading(true)
      await blockRestore({ variables: { input: { ids } } })
      const nextList = list.filter(item => !ids.includes(item.id))
      resetList(nextList)
      ids.forEach(id =>
        client.cache.modify({
          id: client.cache.identify({ __typename: 'BlockInfo', id }),
          fields: {
            isDeleted() {
              return false
            }
          }
        })
      )
      setActionLoading(false)
    },
    [blockRestore, client.cache, selectedItem, list, resetList]
  )

  const onClickBatchDelete = async (): Promise<void> => {
    await onBatchDelete()
  }

  const onItemDelele = async (id: string): Promise<void> => {
    await onBatchDelete([id])
  }

  const onItemRestore = async (id: string): Promise<void> => {
    await onBatchRestore([id])
  }

  const showSpin = listLoading || actionLoading

  if (!showSpin && !data?.trashBlocks?.length) {
    return <NotFound>{t('trash.not_found')}</NotFound>
  }

  const onChange = (index: number) => (checked: boolean) => {
    const item = { ...list[index] }
    item.checked = checked
    replace(index, item)
  }

  const handleClick = (): void => {
    const nextList = list.map(item => {
      return {
        ...item,
        checked: indeterminate
      }
    })
    resetList(nextList)
  }

  return (
    <List>
      {showSpin && <Spin size="lg" className="trash-spin" />}
      <Item type="title" key="title">
        <Page>
          <SelectBlock />
          {t('trash.pages')}
        </Page>
        <Time>{t('trash.deleted_at')}</Time>
        <Action>
          <Card />
        </Action>
      </Item>
      {list.map((item: Block, index: number) => (
        <Item type="item" key={getKey(index)}>
          <TrashItem
            domain={domain}
            block={item}
            onChange={onChange(index)}
            onRestore={onItemRestore}
            onDelete={onItemDelele}
          />
        </Item>
      ))}
      {selectedNum > 0 && (
        <SelectedBar>
          <Page>
            <SelectBlock checked>
              <Checkbox
                onClick={handleClick}
                checked
                noLabel
                style={{ background: theme.colors.white.value }}
                indeterminate={indeterminate}
              />
            </SelectBlock>
            <span>
              {t('trash.selected')} {selectedNum}
            </span>
          </Page>
          <Action>
            <Button style={{ marginRight: '0.5rem' }} icon={<Undo />} onClick={onClickBatchDelete}>
              {t('trash.restore_action')}
            </Button>
            <Button icon={<Delete />} type="danger" onClick={() => setHardDeleteModalVisible(true)}>
              {t('trash.hard_delete_action')}
            </Button>
          </Action>
          <ConfirmDialog
            confirmBtnProps={{
              loading: actionLoading,
              danger: true
            }}
            confirmBtnText={t('trash.delete_confirmation_ok')}
            cancelBtnText={t('trash.delete_confirmation_cancel')}
            onCancel={() => setHardDeleteModalVisible(false)}
            onConfirm={onBatchDelete}
            open={hardDeleteModalVisible}
          >
            {selectedNum > 1
              ? t('trash.batch_delete_confirmation_body', { number: selectedNum })
              : t('trash.delete_confirmation_body')}
          </ConfirmDialog>
        </SelectedBar>
      )}
    </List>
  )
}
