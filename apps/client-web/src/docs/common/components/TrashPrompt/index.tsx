import React, { FC, useState } from 'react'
import { Button, ConfirmDialog } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import {
  BlockHardDeleteInput,
  BlockRestoreInput,
  useBlockHardDeleteMutation,
  useBlockRestoreMutation,
  useBlockCreateMutation,
  useGetPageBlocksQuery
} from '@/BrickdocGraphQL'
import { useNavigate } from 'react-router-dom'
import { queryPageBlocks } from '../../graphql'
import { useApolloClient } from '@apollo/client'
import * as Root from './index.style'
import { useNonNullDocMeta } from '@/docs/store/DocMeta'

export const TrashPrompt: FC = () => {
  const { t } = useDocsI18n()
  const { id, domain, pathArray } = useNonNullDocMeta()
  const client = useApolloClient()
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false)
  const [hardDeleteConfirmLoading, setHardDeleteConfirmLoading] = React.useState<boolean>(false)
  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockHardDelete] = useBlockHardDeleteMutation()
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryPageBlocks] })
  const [blockCreate] = useBlockCreateMutation()
  const { data, refetch } = useGetPageBlocksQuery({ variables: { domain } })

  const navigate = useNavigate()

  const onHardDeleteClick = (): void => {
    setHardDeleteModalVisible(true)
  }

  const onRestoreClick = async (): Promise<void> => {
    setRestoreButtonLoading(true)
    const input: BlockRestoreInput = { ids: [id] }
    await blockRestore({ variables: { input } })
    client.cache.modify({
      id: client.cache.identify({ __typename: 'BlockInfo', id }),
      fields: {
        isDeleted() {
          return false
        }
      }
    })
    setRestoreButtonLoading(false)
  }

  const onCancelDelete = (): void => {
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
  }

  const onConfirmDelete = async (): Promise<void> => {
    let path = `/${domain}`
    setHardDeleteConfirmLoading(true)
    const input: BlockHardDeleteInput = { ids: [id] }
    await blockHardDelete({ variables: { input } })
    if (pathArray?.length) {
      path = `/${domain}/${pathArray[pathArray.length - 1].id}`
    } else {
      const hasPages = data?.pageBlocks?.length
      if (hasPages && data.pageBlocks?.[0]?.id) {
        path = `/${domain}/${data.pageBlocks[0].id}`
      } else {
        const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '' } } })
        if (blockCreateData?.blockCreate?.id) {
          await refetch()
          setHardDeleteModalVisible(false)
          setHardDeleteConfirmLoading(false)
          return navigate(`/${domain}/${blockCreateData?.blockCreate?.id}`, { replace: true })
        }
      }
    }
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
    navigate(path)
  }

  return (
    <>
      <Root.TrashAlert
        message={t('trash.in_trash_prompt')}
        type="error"
        icon={false}
        action={
          <>
            <Button size="sm" disabled={restoreButtonLoading} onClick={onRestoreClick}>
              {t('trash.restore_action')}
            </Button>
            &nbsp;
            <Button size="sm" type="primary" danger onClick={onHardDeleteClick}>
              {t('trash.hard_delete_action')}
            </Button>
          </>
        }
      />
      <ConfirmDialog
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
        cancelBtnText={t('trash.delete_confirmation_cancel')}
        confirmBtnText={t('trash.delete_confirmation_ok')}
        confirmBtnProps={{
          loading: hardDeleteConfirmLoading
        }}
        open={hardDeleteModalVisible}
      >
        {t('trash.delete_confirmation_body')}
      </ConfirmDialog>
    </>
  )
}
