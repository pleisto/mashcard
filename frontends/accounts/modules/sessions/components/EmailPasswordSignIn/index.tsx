import React from "react"
import { Form, Button, Input, Checkbox, Divider } from "@brickdoc/design-system"
import { useAccountsI18n } from "@/accounts/modules/common/hooks"
import { Link } from 'react-router-dom'
import styles from './index.module.less'

const EmailPasswordSignIn: React.FC = () => {
  const { t } = useAccountsI18n()
  return (<Form layout="vertical">
    <Form.Item
      label={t('sessions.email')}
      name="email"
      rules={[{required: true, type: 'email'}]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label={t('sessions.password')}
      name="password"
      rules={[{ required: true }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item name="remember" valuePropName="checked">
      <Checkbox>{t('sessions.remember_me')}</Checkbox>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" size="large" block>
        {t('sessions.sign_in')}
      </Button>
    </Form.Item>
    <Form.Item className={styles.links}>
      <Link to="/sign_up">{t('sessions.sign_up_with_email')}</Link>
      <Divider type="vertical" />
      <Link>{t('sessions.forget_password')}</Link>
    </Form.Item>
  </Form>)
}

export default EmailPasswordSignIn
