import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { useDomainAvailableValidator } from '@/common/hooks'
import { Form, FormControl, Input, Button, Box, theme, toast } from '@brickdoc/design-system'
import { object, string, lazy } from 'yup'
import { Trans } from 'react-i18next'
import { BrickdocContext } from '@/common/brickdocContext'
import { useUpdateDomainMutation } from '@/BrickdocGraphQL'

export const DomainUpdate: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const { t } = useSettingsI18n(['docs'])
  const { settings } = useContext(BrickdocContext)
  const domainAvailableValidator = useDomainAvailableValidator()
  const [updateDomain, { loading }] = useUpdateDomainMutation()
  const domainValidation = object({
    new_domain: lazy((val: string) =>
      val === space?.domain
        ? string().required()
        : // only validate if the new domain is not the same as the current one
          string().test(domainAvailableValidator)
    )
  })

  const form = Form.useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      new_domain: space?.domain
    },
    yup: domainValidation
  })

  const onSubmit = async (values: { new_domain?: string }) => {
    if (values.new_domain === space?.domain) {
      return false
    }
    const result = await updateDomain({
      variables: {
        input: {
          domain: space!.domain,
          newDomain: values.new_domain!
        }
      }
    })
    const errors = result.data?.updateDomain?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.href = `/${values.new_domain}/settings/general`
    }
  }

  return (
    <>
      <Panel title={t(`general.change_domain`)}>
        <Box
          as="p"
          css={{
            color: theme.colors.typeSecondary
          }}
        >
          <Trans
            t={t}
            i18nKey="general.change_domain_desc"
            components={[
              // False positive
              // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-key
              <a target="_blank" href={settings?.kb_articles?.changing_domain} />
            ]}
          />
        </Box>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormControl invalidMessage={form.formState.errors?.new_domain?.message}>
            <Box
              css={{
                display: 'flex',
                width: '100%',
                '&>button': {
                  marginLeft: '.5rem'
                }
              }}
            >
              <Input {...form.register('new_domain')} type="text" />
              <Button type="danger" htmlType="submit" loading={loading}>
                {t(`general.change_domain_btn`)}
              </Button>
            </Box>
          </FormControl>
        </form>
      </Panel>
    </>
  )
}
