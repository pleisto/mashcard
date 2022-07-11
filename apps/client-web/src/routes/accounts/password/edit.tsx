import { omit } from '@mashcard/active-support'
import { Button, Form, Input, toast, useBoolean } from '@mashcard/design-system'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'
import { object, ref, string } from 'yup'

import { mutationResultHandler } from '@/common/utils'
import {
  UserPasswordResetInput,
  UserSignOutInput,
  useUserPasswordResetMutation,
  useUserSignOutMutation
} from '@/MashcardGraphQL'
import { useAccountsI18n } from '../_shared/useAccountsI18n'

const validate = object({
  password: string().required().min(8).max(128),
  confirm_password: string()
    .min(8)
    .max(128)
    .required()
    .oneOf([ref('password'), null]),
  token: string().required()
})

export const Edit: React.FC = () => {
  const { t } = useAccountsI18n()
  const pageTitle = t('sessions.reset_password')
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
  const token = new URLSearchParams(window.location.search).get('reset_password_token')!
  const form = Form.useForm<UserPasswordResetInput>({
    defaultValues: { token },
    yup: validate
  })

  if (didRedirectToSignInPage) {
    return <Navigate to="../sign_in" />
  }

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <Form form={form} layout="vertical" onSubmit={onFinish}>
        <Form.Field hidden name="token">
          <Input type="hidden" />
        </Form.Field>
        <Form.Field name="password" label={t('sessions.password')}>
          <Input type="password" />
        </Form.Field>
        <Form.Field name="confirm_password" label={t('sessions.confirm_password')}>
          <Input type="password" />
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmlType="submit" size="lg" loading={loading} block>
            {t('sessions.reset_password')}
          </Button>
        </Form.Field>
      </Form>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default Edit
