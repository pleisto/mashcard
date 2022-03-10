import React, { useState } from 'react'
import { Alert, Button, ConfirmDialog } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import {
  BlockHardDeleteInput,
  BlockRestoreInput,
  useBlockHardDeleteMutation,
  useBlockRestoreMutation
} from '@/BrickdocGraphQL'
import { useNavigate } from 'react-router-dom'
import { queryPageBlocks } from '../../graphql'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { useApolloClient } from '@apollo/client'

interface TrashPromptProps {
  docMeta: NonNullDocMeta
}

export const TrashPrompt: React.FC<TrashPromptProps> = ({ docMeta: { id, domain } }) => {
  const { t } = useDocsI18n()
  const client = useApolloClient()
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false)
  const [hardDeleteConfirmLoading, setHardDeleteConfirmLoading] = React.useState<boolean>(false)
  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockHardDelete] = useBlockHardDeleteMutation()
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryPageBlocks] })

  const navigate = useNavigate()

  const onHardDeleteClick = (): void => {
    setHardDeleteModalVisible(true)
  }

  const onRestoreClick = async (): Promise<void> => {
    setRestoreButtonLoading(true)
    const input: BlockRestoreInput = { id }
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
    setHardDeleteConfirmLoading(true)
    const input: BlockHardDeleteInput = { id }
    await blockHardDelete({ variables: { input } })
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
    navigate(`/${domain}`)
  }

  return (
    <>
      <Alert
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
