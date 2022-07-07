import { Button, Form, Input, toast, useBoolean } from '@mashcard/design-system'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { object, string } from 'yup'

import { mutationResultHandler } from '@/common/utils'
import { UserForgetPasswordMailSendInput, useUserForgetPasswordMailSendMutation } from '@/MashcardGraphQL'
import { useAccountsI18n } from '../_shared/useAccountsI18n'
import { PasswordChangeEmailNotice } from './_shared/PasswordChangeEmailNotice'

const validation = object({
  email: string().required().email()
})

export const Forget: React.FC = () => {
  const { t } = useAccountsI18n()
  const [didShowPasswordChangeEmailTips, { setTrue: showPasswordChangeEmailTips }] = useBoolean(false)

  // Set Form initial values
  const form = Form.useForm<UserForgetPasswordMailSendInput>({ yup: validation })

  // On Form Submit
  const [userForgetPasswordMailSend, { loading: userForgetPasswordMailSendLoading }] =
    useUserForgetPasswordMailSendMutation()
  const onFinish = async (values: object): Promise<void> => {
    const input = values as UserForgetPasswordMailSendInput

    const { data } = await userForgetPasswordMailSend({ variables: { input } })
    const result = data?.userForgetPasswordMailSend
    mutationResultHandler(result, () => {
      void toast.success(t('devise:passwords.send_instructions'))
      showPasswordChangeEmailTips()
    })
  }

  if (didShowPasswordChangeEmailTips) {
    return <PasswordChangeEmailNotice pending={true} email={form.getValues('email')} />
  }

  // View
  const pageTitle = t('sessions.forget_password')

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <Form form={form} layout="vertical" onSubmit={onFinish}>
        <Form.Field label={t('sessions.email')} name="email">
          <Input type="email" />
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmlType="submit" loading={userForgetPasswordMailSendLoading} size="lg" block>
            {t('sessions.forget_password')}
          </Button>
        </Form.Field>
      </Form>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default Forget
