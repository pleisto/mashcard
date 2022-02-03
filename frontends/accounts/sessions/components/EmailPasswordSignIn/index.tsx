import React from 'react'
import { Button, Input, Checkbox, DeprecatedDivider, toast, Form, SubmitHandler } from '@brickdoc/design-system'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { useUserEmailPasswordSignInMutation, UserEmailPasswordSignInInput } from '@/BrickdocGraphQL'
import { mutationResultHandler } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'

const resolver = zodResolver(
  z.object({
    email: z.string().email(),
    password: z.string().min(1),
    remember: z.boolean()
  })
)

export const EmailPasswordSignIn: React.FC = () => {
  const { t } = useAccountsI18n()
  const [emailPasswordSignIn, { loading }] = useUserEmailPasswordSignInMutation()

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
      <Form onSubmit={onSubmit} resolver={resolver}>
        <Form.Field name="email">
          <Input type="email" />
        </Form.Field>
        <Form.Field name="password">
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
      <Link to="/accounts/sign_up">{t('sessions.sign_up_with_email')}</Link>
      <DeprecatedDivider type="vertical" />
      <Link to="/accounts/password/forget">{t('sessions.forget_password')}</Link>
    </div>
  )
}
