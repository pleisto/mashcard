import { Box, Button, Checkbox, Form, Input, SubmitHandler, theme, toast } from '@mashcard/design-system'
import React from 'react'
import { Link } from 'react-router-dom'
import { boolean, object, string } from 'yup'

import { mutationResultHandler } from '@/common/utils'
import { UserEmailPasswordSignInInput, useUserEmailPasswordSignInMutation } from '@/MashcardGraphQL'
import { useAccountsI18n } from './useAccountsI18n'

const validation = object({
  email: string().email().required(),
  password: string().required(),
  remember: boolean()
})

export const EmailPasswordSignIn: React.FC = () => {
  const { t } = useAccountsI18n()
  const [emailPasswordSignIn, { loading }] = useUserEmailPasswordSignInMutation()
  const form = Form.useForm<UserEmailPasswordSignInInput>({ yup: validation })

  const onSubmit: SubmitHandler<UserEmailPasswordSignInInput> = async input => {
    const { data } = await emailPasswordSignIn({ variables: { input } })
    const result = data?.userEmailPasswordSignIn
    mutationResultHandler(result, () => {
      void toast.success(t('devise:sessions.signed_in'))
      if (result?.redirectPath) {
        globalThis.location.href = result.redirectPath
      }
    })
  }

  return (
    <div>
      <Form form={form} onSubmit={onSubmit}>
        <Form.Field name="email" label={t('sessions.email')}>
          <Input type="email" />
        </Form.Field>
        <Form.Field name="password" label={t('sessions.password')}>
          <Input type="password" />
        </Form.Field>
        <Form.Field name="remember" label={false}>
          <Checkbox>{t('sessions.remember_me')}</Checkbox>
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmlType="submit" loading={loading} size="lg" block>
            {t('sessions.sign_in')}
          </Button>
        </Form.Field>
      </Form>
      <Box
        css={{
          textAlign: 'right',
          a: {
            color: theme.colors.typeThirdary
          },
          '.divider': {
            color: theme.colors.dividerPrimary,
            padding: '0 .5em'
          }
        }}
      >
        <Link to="/accounts/sign-up">{t('sessions.sign_up_with_email')}</Link>
        <span className="divider">|</span>
        <Link to="/accounts/password/forget">{t('sessions.forget_password')}</Link>
      </Box>
    </div>
  )
}
