import {
  Block,
  GetTrashBlocksQueryVariables,
  useGetTrashBlocksQuery,
  useBlockRestoreMutation,
  useBlockHardDeleteMutation
} from '@/MashcardGraphQL'
import { Spin, useList, Checkbox, Button, theme, ConfirmDialog, toast } from '@mashcard/design-system'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { TrashItem } from './TrashItem'
import { Card, Delete, Undo } from '@mashcard/design-icons'
import { debounce } from '@mashcard/active-support'

import { queryPageBlocks, queryTrashBlocks } from '../../graphql'
import { useApolloClient } from '@apollo/client'
import { List, Item, NotFound, Page, Time, Action, SelectBlock, SelectedBar } from './Trash.style'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

interface PageTrashProps {
  domain: string
  keyword: string | undefined
}

export interface BlockWithChecked extends Block {
  checked?: boolean
}

const debounceTimeout = 200

export const PageTrash: React.FC<PageTrashProps> = ({ domain, keyword }) => {
  const { t } = useDocsI18n()
  const client = useApolloClient()
  const [input, setInput] = useState<GetTrashBlocksQueryVariables>({ domain, search: keyword })
  const { list, getKey, addList, resetList, replace } = useList<BlockWithChecked>()
  const setInputDebounce = useMemo(
    () =>
      debounce((domain, keyword) => {
        setInput({
          domain,
          search: keyword
        })
      }, debounceTimeout),
    []
  )

  const { key } = useLocation()

  useEffect(() => {
    setInputDebounce(domain, keyword)
  }, [domain, keyword, setInputDebounce])

  const { data, loading: listLoading, refetch } = useGetTrashBlocksQuery({ variables: input })

  useEffect(() => {
    void refetch()
  }, [key, refetch])

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
      try {
        await blockHardDelete({ variables: { input: { ids } } })
        const nextList = list.filter(item => !ids.includes(item.id))
        resetList(nextList)
      } catch (e) {
        if (e instanceof Error) {
          toast.error(`${e.message})`)
        }
        console.error(e)
        void refetch()
      }

      setHardDeleteModalVisible(false)
      setActionLoading(false)
    },
    [selectedItem, blockHardDelete, list, resetList, refetch]
  )

  const onBatchRestore = useCallback(
    async (_ids?: string[]) => {
      const ids = _ids ?? selectedItem.map(item => item.id)

      setActionLoading(true)
      try {
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
      } catch (e) {
        if (e instanceof Error) {
          toast.error(`${e.message})`)
        }
        console.error(e)
        void refetch()
      }
      setActionLoading(false)
    },
    [blockRestore, client.cache, selectedItem, list, resetList, refetch]
  )

  const onClickBatchDelete = async (): Promise<void> => {
    await onBatchDelete()
  }

  const onClickBatchRestore = async (): Promise<void> => {
    await onBatchRestore()
  }

  const onItemDelele = async (id: string): Promise<void> => {
    await onBatchDelete([id])
  }

  const onItemRestore = async (id: string): Promise<void> => {
    await onBatchRestore([id])
  }

  const showSpin = listLoading || actionLoading

  const head = (
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
  )

  if (!showSpin && !data?.trashBlocks?.length) {
    return (
      <>
        {head}
        <NotFound>{t('trash.not_found')}</NotFound>
      </>
    )
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
    <>
      {head}
      <List>
        {showSpin && <Spin size="lg" className="trash-spin" />}
        {list.map((item: BlockWithChecked, index: number) => (
          <Item checked={!!item.checked} type="item" key={getKey(index)} data-testid={TEST_ID_ENUM.trash.pageItem.id}>
            <TrashItem
              domain={domain}
              block={item}
              onChange={onChange(index)}
              onRestore={onItemRestore}
              onDelete={onItemDelele}
            />
          </Item>
        ))}
      </List>
      {selectedNum > 0 && (
        <SelectedBar>
          <Page css={{ alignItems: 'center', lineHeight: '2em' }}>
            <SelectBlock checked data-testid={TEST_ID_ENUM.trash.selectedBar.button.checkbox.id}>
              <Checkbox
                onClick={handleClick}
                checked
                noLabel
                style={{ background: theme.colors.white.value }}
                indeterminate={indeterminate}
              />
            </SelectBlock>
            <span data-testid={TEST_ID_ENUM.trash.selectedBar.count.id}>
              {t('trash.selected')} {selectedNum}
            </span>
          </Page>
          <Action>
            <Button
              style={{ marginRight: '0.5rem' }}
              icon={<Undo />}
              onClick={onClickBatchRestore}
              data-testid={TEST_ID_ENUM.trash.selectedBar.button.restore.id}
            >
              {t('trash.restore_action')}
            </Button>
            <Button
              icon={<Delete />}
              type="danger"
              onClick={() => setHardDeleteModalVisible(true)}
              data-testid={TEST_ID_ENUM.trash.selectedBar.button.remove.id}
            >
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
            onConfirm={onClickBatchDelete}
            open={hardDeleteModalVisible}
          >
            {selectedNum > 1
              ? t('trash.batch_delete_confirmation_body', { number: selectedNum })
              : t('trash.delete_confirmation_body')}
          </ConfirmDialog>
        </SelectedBar>
      )}
    </>
  )
}
