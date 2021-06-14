import React from "react"
import { useCountDown } from 'ahooks'
import { useAccountsI18n } from "@/accounts/modules/common/hooks"
import {  Button, message } from "@brickdoc/design-system"
import {  Success } from "@brickdoc/design-system/components/icon"
import { mutationResultHandler } from "@/utils"
import { useUserConfirmationEmailResendMutation } from "@/BrickdocGraphQL"
import { millisecondsToSeconds, add } from 'date-fns'

import styles from './index.module.less'

const ConfirmationEmailTips: React.FC<{email?: string}> = ({ email }) => {
  const [ countdown, setTargetDate ] = useCountDown()
  const { t } = useAccountsI18n()
  const [resendEmail, { loading }] = useUserConfirmationEmailResendMutation()

  const onClick = async()=>{
    const {data} = await resendEmail({variables: {  input:{email}}})
    const result = data.userConfirmationEmailResend
    mutationResultHandler(result, ()=>{message.success(t('sessions.email_resend_successful'))})
    setTargetDate(add(Date.now(),{minutes: 1}))
  }

  return (<div className={styles.container}>
    <Success theme="filled" className={styles.icon} />
    <h1>{t('sessions.confirmation_email_required_heading')}</h1>
    <p>{t('sessions.confirmation_email_required')}</p>
    <Button loading={loading} onClick={onClick} disabled={(countdown !== 0)}>
      {(countdown === 0)? t('sessions.resend_unconfirmed_mail'):
        t('sessions.resend_after',{ seconds: millisecondsToSeconds(countdown) }) }
    </Button>
  </div>)
}

export default ConfirmationEmailTips
