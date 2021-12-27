import React from 'react'
import { Form, Button, Input, Checkbox, Divider, message } from '@brickdoc/design-system'
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
      void message.success(t('devise:sessions.signed_in'))
      if (result?.redirectPath) {
        globalThis.location.href = result.redirectPath
      }
    })
  }
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={t('sessions.email')}
        name="email"
        validateTrigger={['onBlur']}
        rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>

      <Form.Item label={t('sessions.password')} name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" initialValue={false}>
        <Checkbox>{t('sessions.remember_me')}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} size="large" block>
          {t('sessions.sign_in')}
        </Button>
      </Form.Item>
      <Form.Item className={styles.links}>
        <Link to="/accounts/sign_up">{t('sessions.sign_up_with_email')}</Link>
        <Divider type="vertical" />
        <Link to="/accounts/password/forget">{t('sessions.forget_password')}</Link>
      </Form.Item>
    </Form>
  )
}
