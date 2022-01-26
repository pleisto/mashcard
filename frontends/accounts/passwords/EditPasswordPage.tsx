import React from 'react'
import { Navigate } from 'react-router'

import { Helmet } from 'react-helmet-async'
import { useConfirmationValidator, useAccountsI18n } from '@/accounts/common/hooks'
import { DeprecatedForm, Button, DeprecatedInput, toast } from '@brickdoc/design-system'
import { omit } from 'lodash-es'
import { useBoolean } from 'ahooks'

import {
  useUserPasswordResetMutation,
  UserPasswordResetInput,
  useUserSignOutMutation,
  UserSignOutInput
} from '@/BrickdocGraphQL'
import { mutationResultHandler } from '@/common/utils'

export const EditPasswordPage: React.FC = () => {
  const { t } = useAccountsI18n()
  const pageTitle = t('sessions.reset_password')
  const passwordConfirmValidator = useConfirmationValidator('password')
  const [didRedirectToSignInPage, { setTrue: redirectToSignInPage }] = useBoolean(false)

  const [emailPasswordSignIn, { loading }] = useUserPasswordResetMutation()
  const [userSignOutMutation] = useUserSignOutMutation()
  const signOutInput: UserSignOutInput = {}
  const onFinish = async (values: UserPasswordResetInput): Promise<void> => {
    const input = omit(values, ['confirm_password']) as UserPasswordResetInput
    const { data } = await emailPasswordSignIn({ variables: { input } })
    const result = data?.userPasswordReset
    mutationResultHandler(result, () => {
      void toast.success(t('devise:passwords.updated'))
      redirectToSignInPage()
      void userSignOutMutation({ variables: { input: signOutInput } })
    })
  }

  if (didRedirectToSignInPage) {
    return <Navigate to="/sign_in" />
  }

  const token = new URLSearchParams(window.location.search).get('reset_password_token')

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <DeprecatedForm layout="vertical" initialValues={{ token }} onFinish={onFinish}>
        <DeprecatedForm.Item hidden name="token" rules={[{ required: true }]}>
          <DeprecatedInput />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item name="password" label={t('sessions.password')} hasFeedback rules={[{ required: true }]}>
          <DeprecatedInput.Password />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item
          name="confirm_password"
          label={t('sessions.confirm_password')}
          hasFeedback
          dependencies={['password']}
          rules={[{ required: true }, passwordConfirmValidator]}>
          <DeprecatedInput.Password />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading} block>
            {t('sessions.reset_password')}
          </Button>
        </DeprecatedForm.Item>
      </DeprecatedForm>
    </div>
  )
}

export default EditPasswordPage
