import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useUserForgetPasswordMailSendMutation, UserForgetPasswordMailSendInput } from '@/BrickdocGraphQL'
import { useBoolean } from 'ahooks'
import { useAccountsI18n } from '@/accounts/modules/common/hooks'
import { mutationResultHandler } from '@/utils'
import { Form, Input, Button, message } from '@brickdoc/design-system'
import { PasswordChangeEmailNotice } from './components/PasswordChangeEmailNotice'

export const ForgetPasswordPage: React.FC = () => {
  const [didShowPasswordChangeEmailTips, { setTrue: showPasswordChangeEmailTips }] = useBoolean(false)

  // Set Form initial values
  const [form] = Form.useForm()
  const { t } = useAccountsI18n()

  // On Form Submit
  const [userForgetPasswordMailSend, { loading: userForgetPasswordMailSendLoading }] = useUserForgetPasswordMailSendMutation()
  const onFinish = async (values: object): Promise<void> => {
    const input = values as UserForgetPasswordMailSendInput

    const { data } = await userForgetPasswordMailSend({ variables: { input } })
    const result = data?.userForgetPasswordMailSend
    mutationResultHandler(result, () => {
      void message.success(t('devise:passwords.send_instructions'))
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
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label={t('sessions.email')} name="email" hasFeedback rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={userForgetPasswordMailSendLoading} block size="large">
            {t('sessions.forget_password')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
