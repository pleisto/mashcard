import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { useWebidAvailableValidator } from '@/common/hooks'
import { Form, FormControl, Input, Button, Box, theme, toast } from '@brickdoc/design-system'
import { object, string, lazy } from 'yup'
import { Trans } from 'react-i18next'
import { BrickdocContext } from '@/common/brickdocContext'
import { useUpdateWebidMutation } from '@/BrickdocGraphQL'

export const WebidUpdate: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n(['docs'])
  const { settings } = useContext(BrickdocContext)
  const webidAvailableValidator = useWebidAvailableValidator()
  const [updateWebid, { loading }] = useUpdateWebidMutation()
  const webidValidation = object({
    new_webid: lazy((val: string) =>
      val === pod?.webid
        ? string().required()
        : // only validate if the new webid is not the same as the current one
          string().test(webidAvailableValidator)
    )
  })

  const form = Form.useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      new_webid: pod?.webid
    },
    yup: webidValidation
  })

  const onSubmit = async (values: { new_webid?: string }) => {
    if (values.new_webid === pod?.webid) {
      return false
    }
    const result = await updateWebid({
      variables: {
        input: {
          webid: pod!.webid,
          newWebid: values.new_webid!
        }
      }
    })
    const errors = result.data?.updateWebid?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.href = `/${values.new_webid}/settings/general`
    }
  }

  return (
    <>
      <Panel title={t(`general.change_webid`)}>
        <Box
          as="p"
          css={{
            color: theme.colors.typeSecondary
          }}
        >
          <Trans
            t={t}
            i18nKey="general.change_webid_desc"
            components={[
              // False positive
              // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-key
              <a target="_blank" href={settings?.kb_articles?.changing_webid} />
            ]}
          />
        </Box>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormControl invalidMessage={form.formState.errors?.new_webid?.message}>
            <Box
              css={{
                display: 'flex',
                width: '100%',
                '&>button': {
                  marginLeft: '.5rem'
                }
              }}
            >
              <Input {...form.register('new_webid')} type="text" />
              <Button type="danger" htmlType="submit" loading={loading}>
                {t(`general.change_webid_btn`)}
              </Button>
            </Box>
          </FormControl>
        </form>
      </Panel>
    </>
  )
}
