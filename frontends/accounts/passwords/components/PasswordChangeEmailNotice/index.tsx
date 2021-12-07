import React, { useState } from 'react'
import { useCountDown } from 'ahooks'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { Button, message } from '@brickdoc/design-system'
import { Success } from '@brickdoc/design-system/components/icon'
import { mutationResultHandler, millisecondsToSeconds } from '@/common/utils'
import { useUserForgetPasswordMailSendMutation } from '@/BrickdocGraphQL'
import dayjs from 'dayjs'
import styles from './index.module.less'

export const PasswordChangeEmailNotice: React.FC<{ email: string; pending?: boolean }> = ({ email, pending }) => {
  const [targetDate, setTargetDate] = useState<number>(pending ? dayjs().add(1, 'minute').unix() : 0)
  const [countdown] = useCountDown({ targetDate })
  const { t } = useAccountsI18n()
  const [resendEmail, { loading }] = useUserForgetPasswordMailSendMutation()

  const onClick = async (): Promise<void> => {
    const { data } = await resendEmail({ variables: { input: { email } } })
    const result = data?.userForgetPasswordMailSend
    mutationResultHandler(result, () => {
      void message.success(t('devise:passwords.send_instructions'))
    })
    setTargetDate(dayjs().add(1, 'minute').unix())
  }

  return (
    <div className={styles.container}>
      <Success theme="filled" className={styles.icon} />
      <p>{t('devise:passwords.send_instructions')}</p>
      <Button loading={loading} onClick={onClick} disabled={countdown !== 0}>
        {countdown === 0 ? t('sessions.resend_confirmed_email') : t('sessions.resend_after', { seconds: millisecondsToSeconds(countdown) })}
      </Button>
    </div>
  )
}
