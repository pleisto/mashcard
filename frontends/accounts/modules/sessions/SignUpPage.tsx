import React from "react"
import { Helmet } from 'react-helmet-async'
import { useGetAccountsConfigFromWsQuery, } from "@/BrickdocGraphQL"
import { useSignUpInitialValues } from "./hooks/useSignUpInitialValues"
import { useConfirmationValidator, useWebidAvailableValidator , useAccountsI18n } from "@/accounts/modules/common/hooks"

import { Form, Input, Button, Skeleton } from "@brickdoc/design-system"
import { parse } from "qs"
import { Trans } from 'react-i18next'

const Page: React.FC = () => {
  const  { loading, data } = useGetAccountsConfigFromWsQuery()

  // substr(1) could remove `?` char
  const qs = parse(window.location.search.substr(1))
  const { initialValues, hasFilled } = useSignUpInitialValues(qs.autofill as object | undefined)
  const providerName = qs.provider as string | undefined
  const { t } = useAccountsI18n()

  const passwordConfirmValidator = useConfirmationValidator("password")
  const webidAvailableValidator = useWebidAvailableValidator()

  const pageTitle = providerName ?
    t("sessions.sign_up_via", { provider: t(`provider.${providerName}`) }) :
    t("sessions.sign_up")

  const EmailPasswordFields = <>
    <Form.Item
      name="email"
      label={t("sessions.email")}
      hasFeedback
      rules={[{ required: !hasFilled }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label={t("sessions.password")}
      hasFeedback
      rules={[{ required: true }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      name="confirm_password"
      label={t("sessions.confirm_password")}
      hasFeedback
      dependencies={["password"]}
      rules={[{ required: true }, passwordConfirmValidator]}
    >
      <Input.Password />
    </Form.Item>
  </>

  if (loading){ return <Skeleton active /> }

  return <div>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
    <h1>{pageTitle}</h1>
    <Form initialValues={initialValues} layout="vertical">
      <Form.Item
        label={t("sessions.webid")}
        name="webid"
        extra={t("sessions.webid_description")}
        hasFeedback
        validateTrigger={["onFocus", "onBlur", "onLoad"]}
        rules={[{ required: true }, webidAvailableValidator]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("sessions.name")}
        name="name"
        hasFeedback
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {
        // Federated Sign Up could skip email and password
        !hasFilled && EmailPasswordFields
      }
      <Form.Item
        hidden
        name="locale"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        name="timezone"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          {t("sessions.sign_up")}
        </Button>
      </Form.Item>
      <div>
        <Trans t={t} i18nKey="sessions.agree_to_agreement"
               components={[
                 // False positive
                 // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-key
                 <a target="_blank" href={data.metadata.config.userAgreementLink} />
               ]} />
      </div>
    </Form>
  </div>
}

export default Page
