import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { useDomainAvailableValidator } from '@/common/hooks'
import { Form, Input, Button, toast } from '@brickdoc/design-system'
import { object, string, lazy } from 'yup'
import { BrickdocContext } from '@/common/brickdocContext'
import { useUpdateDomainMutation } from '@/BrickdocGraphQL'
import * as Root from './styles/DomainUpdate.style'

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

  const onSubmit = async (values: { new_domain?: string }): Promise<false | void> => {
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
    <Panel title={t(`general.change_domain`)}>
      <Root.Warp>
        <Form form={form} onSubmit={onSubmit}>
          <Form.Field name="new_domain" label={t('docs:spaces.domain')}>
            <Input type="text" />
          </Form.Field>
        </Form>
        <Root.Desc>
          {t('general.change_domain_desc')}
          <a target="_blank" href={settings?.kb_articles?.changing_domain}>
            {t('general.change_domain_more')}
          </a>
        </Root.Desc>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t(`general.change_domain_btn`)}
        </Button>
      </Root.Warp>
    </Panel>
  )
}
