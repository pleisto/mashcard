import { Button, Form, FormControl, Select, toast } from '@mashcard/design-system'
import { FC, useContext } from 'react'

import { MashcardContext } from '@/common/mashcardContext'
import {
  useGetMetadataFromWsQuery,
  UserAppearanceUpdateInput,
  useUserAppearanceUpdateMutation
} from '@/MashcardGraphQL'
import { Panel } from '../../_shared/Panel'
import { SettingsContextProps } from '../../_shared/SettingContext'
import { useSettingsI18n } from '../../_shared/useSettingsI18n'
import * as Root from './Display.style'

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
