import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useUserForgetPasswordMailSendMutation, UserForgetPasswordMailSendInput } from '@/BrickdocGraphQL'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { mutationResultHandler } from '@/common/utils'
import { DeprecatedForm, DeprecatedInput, Button, toast, useBoolean } from '@brickdoc/design-system'
import { PasswordChangeEmailNotice } from './components/PasswordChangeEmailNotice'

export const ForgetPasswordPage: React.FC = () => {
  const [didShowPasswordChangeEmailTips, { setTrue: showPasswordChangeEmailTips }] = useBoolean(false)

  // Set Form initial values
  const [form] = DeprecatedForm.useForm()
  const { t } = useAccountsI18n()

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
    return <PasswordChangeEmailNotice pending={true} email={form.getFieldValue('email')} />
  }

  // View
  const pageTitle = t('sessions.forget_password')

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <DeprecatedForm form={form} layout="vertical" onFinish={onFinish}>
        <DeprecatedForm.Item label={t('sessions.email')} name="email" hasFeedback rules={[{ required: true }]}>
          <DeprecatedInput />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item>
          <Button type="primary" htmlType="submit" loading={userForgetPasswordMailSendLoading} size="lg" block>
            {t('sessions.forget_password')}
          </Button>
        </DeprecatedForm.Item>
      </DeprecatedForm>
    </div>
  )
}

export default ForgetPasswordPage
