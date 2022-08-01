import { Button, ConfirmDialog } from '@mashcard/design-system'
import React, { FC, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useNonNullDocMeta } from '../../../../_shared/DocMeta'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'
import * as Root from './HistoryPrompt.style'

interface HistoryPromptProps {
  restoreHistory: () => Promise<void>
}

export const HistoryPrompt: FC<HistoryPromptProps> = ({ restoreHistory }) => {
  const { t } = useDocsI18n()
  // const { id, domain } = useNonNullDocMeta()
  const [restoreModalVisible, setRestoreModalVisible] = useState<boolean>(false)
  const [restoreConfirmLoading, setRestoreConfirmLoading] = React.useState<boolean>(false)

  // const navigate = useNavigate()

  const onRestoreClick = (): void => {
    setRestoreModalVisible(true)
  }

  const onCancelRestore = (): void => {
    setRestoreModalVisible(false)
    setRestoreConfirmLoading(false)
  }

  const onConfirmRestore = async (): Promise<void> => {
    await restoreHistory()
    setRestoreModalVisible(false)
    setRestoreConfirmLoading(false)
    // navigate(`/${domain}/${id}`)
  }

  return (
    <>
      <Root.HistoryAlert
        message={t('history.in_history_prompt')}
        type="warning"
        closeIcon={false}
        icon={false}
        action={
          <>
            <Button size="sm" type="secondary" onClick={onRestoreClick}>
              {t('history.restore')}
            </Button>
          </>
        }
      />
      <ConfirmDialog
        onCancel={onCancelRestore}
        onConfirm={onConfirmRestore}
        cancelBtnText={t('history.restore_confirmation_cancel')}
        confirmBtnText={t('history.restore_confirmation_ok')}
        confirmBtnProps={{
          loading: restoreConfirmLoading
        }}
        open={restoreModalVisible}>
        {t('history.restore_confirmation_body')}
      </ConfirmDialog>
    </>
  )
}
