import React from 'react'
import { DeprecatedForm, Button, DeprecatedInput, Checkbox, DeprecatedDivider, toast } from '@brickdoc/design-system'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { useUserEmailPasswordSignInMutation, UserEmailPasswordSignInInput } from '@/BrickdocGraphQL'
import { mutationResultHandler } from '@/common/utils'
import { Link } from 'react-router-dom'
import styles from './index.module.less'

export const EmailPasswordSignIn: React.FC = () => {
  const { t } = useAccountsI18n()
  const [emailPasswordSignIn, { loading }] = useUserEmailPasswordSignInMutation()
  const onFinish = async (values: UserEmailPasswordSignInInput): Promise<void> => {
    const { data } = await emailPasswordSignIn({ variables: { input: values } })
    const result = data?.userEmailPasswordSignIn
    mutationResultHandler(result, () => {
      void toast.success(t('devise:sessions.signed_in'))
      if (result?.redirectPath) {
        globalThis.location.href = result.redirectPath
      }
    })
  }
  return (
    <DeprecatedForm layout="vertical" onFinish={onFinish}>
      <DeprecatedForm.Item
        label={t('sessions.email')}
        name="email"
        validateTrigger={['onBlur']}
        rules={[{ required: true, type: 'email' }]}>
        <DeprecatedInput />
      </DeprecatedForm.Item>

      <DeprecatedForm.Item label={t('sessions.password')} name="password" rules={[{ required: true }]}>
        <DeprecatedInput.Password />
      </DeprecatedForm.Item>
      <DeprecatedForm.Item name="remember" valuePropName="checked" initialValue={false}>
        <Checkbox>{t('sessions.remember_me')}</Checkbox>
      </DeprecatedForm.Item>
      <DeprecatedForm.Item>
        <Button type="primary" htmlType="submit" loading={loading} size="large" block>
          {t('sessions.sign_in')}
        </Button>
      </DeprecatedForm.Item>
      <DeprecatedForm.Item className={styles.links}>
        <Link to="/accounts/sign_up">{t('sessions.sign_up_with_email')}</Link>
        <DeprecatedDivider type="vertical" />
        <Link to="/accounts/password/forget">{t('sessions.forget_password')}</Link>
      </DeprecatedForm.Item>
    </DeprecatedForm>
  )
}
