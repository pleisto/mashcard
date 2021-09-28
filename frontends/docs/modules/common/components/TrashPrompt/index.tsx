import React, { useState } from 'react'
import { Alert, Button, Modal, Space } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { BlockHardDeleteInput, BlockRestoreInput, useBlockHardDeleteMutation, useBlockRestoreMutation } from '@/BrickdocGraphQL'
import { Redirect } from 'react-router-dom'
import { queryChildrenBlocks } from '@/docs/modules/pages/graphql'
import { queryPageBlocks } from '../../graphql'

interface TrashPromptProps {
  docid: string
  webid: string
}

export const TrashPrompt: React.FC<TrashPromptProps> = ({ docid, webid }) => {
  const { t } = useDocsI18n()
  const [redirectHome, setRedirectHome] = useState<boolean>(false)
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false)
  const [hardDeleteConfirmLoading, setHardDeleteConfirmLoading] = React.useState<boolean>(false)
  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockHardDelete] = useBlockHardDeleteMutation()
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryChildrenBlocks, queryPageBlocks] })

  const link = `/${webid}`
  if (redirectHome) {
    return <Redirect to={link} />
  }

  const onHardDeleteClick = (): void => {
    setHardDeleteModalVisible(true)
  }

  const onRestoreClick = async (): Promise<void> => {
    setRestoreButtonLoading(true)
    const input: BlockRestoreInput = { id: docid }
    await blockRestore({ variables: { input } })
    setRestoreButtonLoading(false)
  }

  const onCancelDelete = (): void => {
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
  }

  const onConfirmDelete = async (): Promise<void> => {
    setHardDeleteConfirmLoading(true)
    const input: BlockHardDeleteInput = { id: docid }
    await blockHardDelete({ variables: { input } })
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
    setRedirectHome(true)
  }

  return (
    <>
      <Alert
        message={t('trash.in_trash_prompt')}
        type="error"
        action={
          <Space>
            <Button size="small" loading={restoreButtonLoading} onClick={onRestoreClick}>
              {t('trash.restore_action')}
            </Button>
            <Button size="small" type="primary" danger onClick={onHardDeleteClick}>
              {t('trash.hard_delete_action')}
            </Button>
          </Space>
        }
        closable
      />
      <Modal
        title={null}
        okText={t('trash.delete_confirmation_ok')}
        cancelText={t('trash.delete_confirmation_cancel')}
        closable={false}
        destroyOnClose={true}
        confirmLoading={hardDeleteConfirmLoading}
        onCancel={onCancelDelete}
        onOk={onConfirmDelete}
        visible={hardDeleteModalVisible}>
        {t('trash.delete_confirmation_body')}
      </Modal>
    </>
  )
}
