import { FC } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Form, Input, TextArea, Button, toast } from '@brickdoc/design-system'
import { AvatarEditor } from './components/AvatarEditor'
import { object, string } from 'yup'
import { PodOperation, useCreateOrUpdatePodMutation, CreateOrUpdatePodInput } from '@/BrickdocGraphQL'

const profileValidation = object({
  name: string().required(),
  bio: string().max(140)
})

export const ProfileEdit: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n(['docs'])
  const [updatePod, { loading: profileSubmitting }] = useCreateOrUpdatePodMutation()
  const profileForm = Form.useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: pod?.name,
      bio: pod?.bio
    },
    yup: profileValidation
  })

  const onProfileSubmit = async (values: Omit<CreateOrUpdatePodInput, 'webid' | 'type'>) => {
    const result = await updatePod({
      variables: {
        input: {
          type: PodOperation.Update,
          webid: pod!.webid,
          ...values
        }
      }
    })
    const errors = result.data?.createOrUpdatePod?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('general.profile_updated'))
    }
  }

  return (
    <Panel title={t(`general.${pod?.personal ? 'user' : 'group'}_profile`)}>
      <Form form={profileForm} onSubmit={onProfileSubmit}>
        <Form.Field label={t('docs:pods.avatar')}>
          <AvatarEditor />
        </Form.Field>
        <Form.Field name="name" label={t('docs:pods.name')}>
          <Input type="text" />
        </Form.Field>
        <Form.Field name="bio" label={t('docs:pods.bio')}>
          <TextArea />
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmlType="submit" loading={profileSubmitting}>
            {t('general.update_profile')}
          </Button>
        </Form.Field>
      </Form>
    </Panel>
  )
}
