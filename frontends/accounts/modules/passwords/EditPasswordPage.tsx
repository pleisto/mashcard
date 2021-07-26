import React from 'react'
import { Redirect } from 'react-router'

import { Helmet } from 'react-helmet-async'
import { useConfirmationValidator, useAccountsI18n } from '@/accounts/modules/common/hooks'
import { Form, Button, Input, message } from '@brickdoc/design-system'
import { omit } from 'lodash'
import { useBoolean } from 'ahooks'

import { useUserPasswordResetMutation, UserPasswordResetInput, useUserSignOutMutation, UserSignOutInput } from '@/BrickdocGraphQL'
import { mutationResultHandler } from '@/utils'

const EditPasswordPage: React.FC = () => {
  const { t } = useAccountsI18n()
  const pageTitle = t('sessions.reset_password')
  const passwordConfirmValidator = useConfirmationValidator('password')
  const [didRedirectToSignInPage, { setTrue: redirectToSignInPage }] = useBoolean(false)

  const [emailPasswordSignIn, { loading }] = useUserPasswordResetMutation()
  const [userSignOutMutation] = useUserSignOutMutation()
  const signOutInput: UserSignOutInput = {}
  const onFinish = async (values: UserPasswordResetInput) => {
    const input = omit(values, ['confirm_password']) as UserPasswordResetInput
    const { data } = await emailPasswordSignIn({ variables: { input } })
    const result = data.userPasswordReset
    mutationResultHandler(result, () => {
      message.success(t('devise:passwords.updated'))
      redirectToSignInPage()
      void userSignOutMutation({ variables: { input: signOutInput } })
    })
  }

  if (didRedirectToSignInPage) {
    return <Redirect to="/sign_in" />
  }

  const token = new URLSearchParams(window.location.search).get('reset_password_token')

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <Form layout="vertical" initialValues={{ token }} onFinish={onFinish}>
        <Form.Item hidden name="token" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label={t('sessions.password')} hasFeedback rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label={t('sessions.confirm_password')}
          hasFeedback
          dependencies={['password']}
          rules={[{ required: true }, passwordConfirmValidator]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading} block>
            {t('sessions.reset_password')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditPasswordPage
