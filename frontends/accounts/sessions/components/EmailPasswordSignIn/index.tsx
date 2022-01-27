import React from 'react'
import { Button, Input, Checkbox, DeprecatedDivider, toast } from '@brickdoc/design-system'
import { useForm, SubmitHandler } from 'react-hook-form'
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserEmailPasswordSignInInput>({ resolver })
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
    // todo:  https://react-hook-form.com/advanced-usage#SmartFormComponent
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input aria-invalid={errors.email ? 'true' : 'false'} {...register('email')} />
        {errors.email && <div>{errors.email.message}</div>}
        <Input aria-invalid={errors.password ? 'true' : 'false'} {...register('password')} type="password" />
        {errors.password && <div>{errors.password.message}</div>}
        <Checkbox {...register('remember')}>{t('sessions.remember_me')}</Checkbox>
        <Button type="primary" htmlType="submit" loading={loading} size="lg" block>
          {t('sessions.sign_in')}
        </Button>
      </form>
      <Link to="/accounts/sign_up">{t('sessions.sign_up_with_email')}</Link>
      <DeprecatedDivider type="vertical" />
      <Link to="/accounts/password/forget">{t('sessions.forget_password')}</Link>
    </div>
  )
}
