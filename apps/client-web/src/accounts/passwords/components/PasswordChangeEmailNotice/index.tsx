import React, { useState } from 'react'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { Button, toast, useCountDown, Box, prefix, theme } from '@mashcard/design-system'
import { Success } from '@mashcard/design-icons'
import { mutationResultHandler } from '@/common/utils'
import { ms } from '@mashcard/active-support'
import { useUserForgetPasswordMailSendMutation } from '@/MashcardGraphQL'
import dayjs from 'dayjs'

export const PasswordChangeEmailNotice: React.FC<{ email: string; pending?: boolean }> = ({ email, pending }) => {
  const [targetDate, setTargetDate] = useState<number>(pending ? dayjs().add(1, 'minute').unix() : 0)
  const [countdown] = useCountDown({ targetDate })
  const { t } = useAccountsI18n()
  const [resendEmail, { loading }] = useUserForgetPasswordMailSendMutation()

  const onClick = async (): Promise<void> => {
    const { data } = await resendEmail({ variables: { input: { email } } })
    const result = data?.userForgetPasswordMailSend
    mutationResultHandler(result, () => {
      void toast.success(t('devise:passwords.send_instructions'))
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
      <p>{t('devise:passwords.send_instructions')}</p>
      <Button loading={loading} onClick={onClick} disabled={countdown !== 0}>
        {countdown === 0 ? t('sessions.resend_confirmed_email') : t('sessions.resend_after', { ms: ms(countdown) })}
      </Button>
    </Box>
  )
}
