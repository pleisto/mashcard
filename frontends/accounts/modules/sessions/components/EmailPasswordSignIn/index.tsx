import React from "react"
import { Form, Button, Input, Checkbox, Divider, message } from "@brickdoc/design-system"
import { useAccountsI18n } from "@/accounts/modules/common/hooks"
import { useUserEmailPasswordSignInMutation, UserEmailPasswordSignInInput } from "@/BrickdocGraphQL"
import { mutationResultHandler } from "@/utils"
import { Link } from 'react-router-dom'
import styles from './index.module.less'

const EmailPasswordSignIn: React.FC = () => {
  const { t } = useAccountsI18n()
  const [ emailPasswordSignIn, { loading } ] = useUserEmailPasswordSignInMutation()
  const onFinish =  async (values: UserEmailPasswordSignInInput) => {
    const { data } = await emailPasswordSignIn({ variables: { input: values } })
    const result = data.userEmailPasswordSignIn
    mutationResultHandler(result, ()=>{
      message.success(t('devise:sessions.signed_in'))
      globalThis.location.href = result.redirectPath
    })
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
      <Button type="primary" htmlType="submit" size="large" loading={loading} block>
        {t('sessions.sign_in')}
      </Button>
    </Form.Item>
    <Form.Item className={styles.links}>
      <Link to="/sign_up">{t('sessions.sign_up_with_email')}</Link>
      <Divider type="vertical" />
      <Link to="/password/forget">{t('sessions.forget_password')}</Link>
    </Form.Item>
  </Form>)
}

export default EmailPasswordSignIn
