import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { BrickdocContext } from '@/common/brickdocContext'
import { Trans } from 'react-i18next'
import { Panel } from '@/settings/common/components/Panel'
import { Helmet } from 'react-helmet-async'
import { SettingsContext } from '@/settings/SettingContext'
import { Form, Input, TextArea, Button } from '@brickdoc/design-system'

export const GeneralPage: FC = () => {
  const { t } = useSettingsI18n(['docs'])
  const { pod } = useContext(SettingsContext)!
  const { settings } = useContext(BrickdocContext)
  const profileForm = Form.useForm({
    defaultValues: {
      name: pod?.name,
      bio: pod?.bio,
      avatar: pod?.avatarData
    }
  })

  const appearance = <Panel title={t('general.appearance')}>Todo: Timezone and Language settings</Panel>

  return (
    <>
      <Helmet title={t('menu.general')} />
      <Panel title={t(`general.${pod?.personal ? 'user' : 'group'}_profile`)}>
        <Form form={profileForm}>
          <Form.Field name="name" label={t('docs:pods.name')}>
            <Input type="text" />
          </Form.Field>
          <Form.Field name="bio" label={t('docs:pods.bio')}>
            <TextArea />
          </Form.Field>
          <Form.Field label={t('docs:pods.avatar')}>
            <div>Todo: Avatar Uploader</div>
          </Form.Field>
          <Form.Field>
            <Button type="primary" htmlType="submit">
              {t('general.update_profile')}
            </Button>
          </Form.Field>
        </Form>
      </Panel>
      <Panel title={t(`general.change_webid`)}>
        <p>
          <Trans
            t={t}
            i18nKey="general.change_webid_desc"
            components={[
              // False positive
              // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-key
              <a target="_blank" href={settings?.kb_articles?.changing_webid} />
            ]}
          />
        </p>
        <Button>{t(`general.change_webid`)}</Button>
      </Panel>
      {pod?.personal && appearance}
    </>
  )
}
export default GeneralPage
