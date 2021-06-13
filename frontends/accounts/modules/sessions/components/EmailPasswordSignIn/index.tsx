import React from "react"
import { isEmpty } from 'lodash'
import { Form, Button, Input, Checkbox, Divider, message } from "@brickdoc/design-system"
import { useAccountsI18n } from "@/accounts/modules/common/hooks"
import { useEmailPasswordSignInMutation, EmailPasswordSignInInput } from "@/BrickdocGraphQL"
import { Link } from 'react-router-dom'
import styles from './index.module.less'

const EmailPasswordSignIn: React.FC = () => {
  const { t } = useAccountsI18n()
  const [ emailPasswordSignIn] = useEmailPasswordSignInMutation()
  const onFinish =  async (values: EmailPasswordSignInInput) => {
    const { data } = await emailPasswordSignIn({ variables: { input: values } })
    if (isEmpty(data.emailPasswordSignIn.errors)) {
      message.success(t('sessions.sign_in_successful'))
      globalThis.location.href = data.emailPasswordSignIn.redirectPath
    } else {
      data.emailPasswordSignIn.errors.map(error => message.error(error))
    }
  }
  return (<Form layout="vertical" onFinish={onFinish}>
    <Form.Item
      label={t('sessions.email')}
      name="email"
      validateTrigger={["onBlur"]}
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
    <Form.Item name="remember" valuePropName="checked" initialValue={false}>
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
      <Link to="/password/new">{t('sessions.forget_password')}</Link>
    </Form.Item>
  </Form>)
}

export default EmailPasswordSignIn
