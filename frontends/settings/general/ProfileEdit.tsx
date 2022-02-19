import { FC } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Form, Input, TextArea, Button, toast } from '@brickdoc/design-system'
import { AvatarEditor } from './components/AvatarEditor'
import { object, string } from 'yup'
import {
  useGetCurrentSpaceQuery,
  SpaceOperation,
  useCreateOrUpdateSpaceMutation,
  CreateOrUpdateSpaceInput
} from '@/BrickdocGraphQL'

const profileValidation = object({
  name: string().required(),
  bio: string().max(140)
})

export const ProfileEdit: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const { refetch } = useGetCurrentSpaceQuery({})
  const { t } = useSettingsI18n(['docs'])
  const [updateSpace, { loading: profileSubmitting }] = useCreateOrUpdateSpaceMutation()
  const profileForm = Form.useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: space?.name,
      bio: space?.bio
    },
    yup: profileValidation
  })

  const onProfileSubmit = async (values: Omit<CreateOrUpdateSpaceInput, 'domain' | 'type'>) => {
    const result = await updateSpace({
      variables: {
        input: {
          type: SpaceOperation.Update,
          domain: space!.domain,
          ...values
        }
      }
    })
    const errors = result.data?.createOrUpdateSpace?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      void refetch()
      toast.success(t('general.profile_updated'))
    }
  }

  return (
    <Panel title={t(`general.${space?.personal ? 'user' : 'group'}_profile`)}>
      <Form form={profileForm} onSubmit={onProfileSubmit}>
        <Form.Field label={t('docs:spaces.avatar')}>
          <AvatarEditor />
        </Form.Field>
        <Form.Field name="name" label={t('docs:spaces.name')}>
          <Input type="text" />
        </Form.Field>
        <Form.Field name="bio" label={t('docs:spaces.bio')}>
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
