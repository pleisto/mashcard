import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  useGetAccountsConfigFromWsQuery,
  useGetFederatedIdentitySessionQuery,
  useUserCreateMutation,
  UserCreateInput
} from '@/BrickdocGraphQL'
import { useBoolean } from 'ahooks'
import { useSignUpInitialValues } from './hooks/useSignUpInitialValues'
import { useWebidAvailableValidator } from '@/common/hooks'
import { useConfirmationValidator, useAccountsI18n } from '@/accounts/common/hooks'
import { omit, omitBy, pick, isNil } from 'lodash-es'
import { mutationResultHandler } from '@/common/utils'
import { DeprecatedForm, DeprecatedInput, Button, DeprecatedSkeleton, toast } from '@brickdoc/design-system'
import { Trans } from 'react-i18next'
import { ConfirmationEmailTips } from './components/ConfirmationEmailTips'
import { useEmailAvailableValidator } from '@/common/hooks/useEmailAvailableValidator'
import { usePasswordAvailableValidator } from '@/common/hooks/usePasswordAvailableValidator'

export const SignUpPage: React.FC = () => {
  const [didShowConfirmationEmailTips, { setTrue: showConfirmationEmailTips }] = useBoolean(false)
  const { loading: configLoading, data: configData } = useGetAccountsConfigFromWsQuery()

  // Set Form initial values
  const [form] = DeprecatedForm.useForm()
  const { loading: sessionLoading, data: sessionData } = useGetFederatedIdentitySessionQuery()
  const { initialValues, setFill } = useSignUpInitialValues()
  useEffect(() => {
    if (!sessionLoading) {
      setFill(
        omitBy(pick(sessionData?.federatedIdentitySession, ['webid', 'name']), isNil) as { webid: string; name: string }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLoading, sessionData])
  const providerName = sessionData?.federatedIdentitySession?.provider
  const { t } = useAccountsI18n()

  // Set Validator
  const passwordConfirmValidator = useConfirmationValidator('password')
  const webidAvailableValidator = useWebidAvailableValidator()
  const emailAvailableValidator = useEmailAvailableValidator()
  const passwordAvailableValidator = usePasswordAvailableValidator()

  // On Form Submit
  const [userCreate, { loading: userCreateLoading }] = useUserCreateMutation()
  const onFinish = async (values: object): Promise<void> => {
    const input = omit(values, ['confirm_password']) as UserCreateInput
    const { data } = await userCreate({ variables: { input } })
    const result = data?.userCreate
    mutationResultHandler(result, () => {
      if (result?.redirectPath && result.isUserActive) {
        void toast.success(t('devise:registrations.signed_up'))
        globalThis.location.href = result.redirectPath
      } else {
        showConfirmationEmailTips()
      }
    })
  }

  // Loading Status
  if (configLoading || sessionLoading) {
    return <DeprecatedSkeleton active />
  }

  // Email unactive tips
  if (didShowConfirmationEmailTips) {
    return <ConfirmationEmailTips email={form.getFieldValue('email')} />
  }

  // View
  const pageTitle = providerName
    ? t('sessions.sign_up_via', { provider: t(`provider.${providerName}`) })
    : t('sessions.sign_up')

  const EmailPasswordFields = (
    <>
      <DeprecatedForm.Item
        name="email"
        label={t('sessions.email')}
        hasFeedback
        rules={[{ required: !sessionData?.federatedIdentitySession?.hasSession }, emailAvailableValidator]}
      >
        <DeprecatedInput />
      </DeprecatedForm.Item>
      <DeprecatedForm.Item
        name="password"
        label={t('sessions.password')}
        hasFeedback
        rules={[{ required: true }, passwordAvailableValidator]}
      >
        <DeprecatedInput.Password />
      </DeprecatedForm.Item>
      <DeprecatedForm.Item
        name="confirm_password"
        label={t('sessions.confirm_password')}
        hasFeedback
        dependencies={['password']}
        rules={[{ required: true }, passwordConfirmValidator]}
      >
        <DeprecatedInput.Password />
      </DeprecatedForm.Item>
    </>
  )

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <DeprecatedForm form={form} initialValues={initialValues} layout="vertical" onFinish={onFinish}>
        <DeprecatedForm.Item
          label={t('sessions.webid')}
          name="webid"
          extra={<small>{t('sessions.webid_description')}</small>}
          hasFeedback
          validateTrigger={['onFocus', 'onBlur']}
          rules={[{ required: true }, webidAvailableValidator]}
        >
          <DeprecatedInput />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item label={t('sessions.name')} name="name" hasFeedback rules={[{ required: true }]}>
          <DeprecatedInput />
        </DeprecatedForm.Item>
        {
          // Federated Sign Up could skip email and password
          !sessionData?.federatedIdentitySession?.hasSession && EmailPasswordFields
        }
        <DeprecatedForm.Item hidden name="locale" rules={[{ required: true }]}>
          <DeprecatedInput />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item hidden name="timezone" rules={[{ required: true }]}>
          <DeprecatedInput />
        </DeprecatedForm.Item>
        <DeprecatedForm.Item>
          <Button type="primary" htmlType="submit" size="lg" loading={userCreateLoading} block>
            {t('sessions.sign_up')}
          </Button>
        </DeprecatedForm.Item>
        <div>
          <small>
            <Trans
              t={t}
              i18nKey="sessions.agree_to_agreement"
              components={[
                // False positive
                // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-key
                <a target="_blank" href={configData?.metadata.config.userAgreementLink} />
              ]}
            />
          </small>
        </div>
      </DeprecatedForm>
    </div>
  )
}

export default SignUpPage
