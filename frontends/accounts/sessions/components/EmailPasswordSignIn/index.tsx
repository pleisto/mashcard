import React from 'react'
import {
  Button,
  Input,
  Checkbox,
  DeprecatedDivider,
  toast,
  Form,
  SubmitHandler,
  Box,
  theme
} from '@brickdoc/design-system'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { useUserEmailPasswordSignInMutation, UserEmailPasswordSignInInput } from '@/BrickdocGraphQL'
import { mutationResultHandler } from '@/common/utils'
import { object, string, boolean } from 'yup'
import { Link } from 'react-router-dom'

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
          }
        }}
      >
        <Link to="/accounts/sign_up">{t('sessions.sign_up_with_email')}</Link>
        <DeprecatedDivider type="vertical" />
        <Link to="/accounts/password/forget">{t('sessions.forget_password')}</Link>
      </Box>
    </div>
  )
}
