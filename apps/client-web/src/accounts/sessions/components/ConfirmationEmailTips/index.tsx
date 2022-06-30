import React, { useState } from 'react'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { Button, toast, useCountDown, Box, theme, prefix } from '@mashcard/design-system'
import { Success } from '@mashcard/design-icons'
import { mutationResultHandler } from '@/common/utils'
import { ms } from '@mashcard/active-support'
import { useUserConfirmationEmailResendMutation } from '@/MashcardGraphQL'
import dayjs from 'dayjs'

export const ConfirmationEmailTips: React.FC<{ email: string }> = ({ email }) => {
  const { t } = useAccountsI18n()
  const [targetDate, setTargetDate] = useState<number>()
  const [countdown] = useCountDown({ targetDate })
  const [resendEmail, { loading }] = useUserConfirmationEmailResendMutation()

  const onClick = async (): Promise<void> => {
    const { data } = await resendEmail({ variables: { input: { email } } })
    const result = data?.userConfirmationEmailResend
    mutationResultHandler(result, () => {
      void toast.success(t('devise:confirmations.send_paranoid_instructions'))
    })
    setTargetDate(dayjs().add(1, 'minute').unix())
  }

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [`.${prefix}-icon-success`]: {
          fontSize: '4rem',
          marginBottom: '1rem',
          color: theme.colors.green6
        },
        h4: {
          margin: '2rem 0'
        }
      }}
    >
      <Success theme="filled" />
      <h1>{t('sessions.confirmation_email_required_heading')}</h1>
      <p>{t('devise:registrations.signed_up_but_unconfirmed')}</p>
      <Button loading={loading} onClick={onClick} disabled={countdown !== 0}>
        {countdown === 0 ? t('sessions.resend_confirmed_email') : t('sessions.resend_after', { ms: ms(countdown) })}
      </Button>
    </Box>
  )
}
