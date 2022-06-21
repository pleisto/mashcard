import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Form, FormControl, Button, toast, Select } from '@mashcard/design-system'
import { MashcardContext } from '@/common/mashcardContext'
import {
  useUserAppearanceUpdateMutation,
  UserAppearanceUpdateInput,
  useGetMetadataFromWsQuery
} from '@/MashcardGraphQL'
import * as Root from './styles/Display.style'

const AppearanceSelect: FC<{
  name: string
  options: Array<{
    label: string
    value: string
  }>
  control: any
}> = props => (
  <Form.Controller
    name={props.name}
    control={props.control}
    render={({ field }) => <Select showSearch style={{ width: '100%' }} {...field} options={props.options} />}
  />
)

export const Display: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n()
  const { timezone, locale } = useContext(MashcardContext)
  const { data, loading: getMetadataLoading } = useGetMetadataFromWsQuery()
  const [updatePod, { loading }] = useUserAppearanceUpdateMutation()
  const form = Form.useForm({
    defaultValues: {
      timezone,
      locale
    }
  })

  const onSubmit = async (values: UserAppearanceUpdateInput): Promise<void> => {
    const result = await updatePod({
      variables: {
        input: values
      }
    })
    const errors = result.data?.userAppearanceUpdate?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.reload()
    }
  }

  if (getMetadataLoading) return <></>

  const availableTimezones = data!.metadata.availableTimezones.map(i => ({ label: i, value: i }))
  const availableLocales = data!.metadata.availableLocales.map(i => ({ label: i.label, value: i.value }))

  return (
    <Panel title={t('general.display')}>
      <Root.Warp>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormControl label={t('general.timezone')}>
            <AppearanceSelect name="timezone" control={form.control} options={availableTimezones} />
          </FormControl>
          <FormControl label={t('general.locale')}>
            <AppearanceSelect name="locale" control={form.control} options={availableLocales} />
          </FormControl>
          <FormControl>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('general.update_appearance')}
            </Button>
          </FormControl>
        </form>
      </Root.Warp>
    </Panel>
  )
}
