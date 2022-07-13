import { Button, Form, Input, toast } from '@mashcard/design-system'
import { FC, useContext } from 'react'
import { lazy, object, string } from 'yup'

import { useDomainAvailableValidator } from '@/common/hooks'
import { MashcardContext } from '@/common/mashcardContext'
import { useUpdateDomainMutation } from '@/MashcardGraphQL'
import { Panel } from '../../_shared/Panel'
import { SettingsContextProps } from '../../_shared/SettingContext'
import { useSettingsI18n } from '../../_shared/useSettingsI18n'
import * as Root from './DomainUpdate.style'

export const DomainUpdate: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n(['docs'])
  const { settings } = useContext(MashcardContext)
  const domainAvailableValidator = useDomainAvailableValidator()
  const [updateDomain, { loading }] = useUpdateDomainMutation()
  const domainValidation = object({
    new_domain: lazy((val: string) =>
      val === pod?.domain
        ? string().required()
        : // only validate if the new domain is not the same as the current one
          string().test(domainAvailableValidator)
    )
  })

  const form = Form.useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      new_domain: pod?.domain
    },
    yup: domainValidation
  })

  const onSubmit = async (values: { new_domain?: string }): Promise<false | void> => {
    if (values.new_domain === pod?.domain) {
      return false
    }
    const result = await updateDomain({
      variables: {
        input: {
          domain: pod!.domain,
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
          <Form.Field name="new_domain" label={t('docs:pods.domain')}>
            <Input type="text" />
          </Form.Field>

          <Root.Desc>
            {t('general.change_domain_desc')}
            <a target="_blank" href={settings?.kb_articles?.changing_domain}>
              {t('general.change_domain_more')}
            </a>
          </Root.Desc>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t(`general.change_domain_btn`)}
          </Button>
        </Form>
      </Root.Warp>
    </Panel>
  )
}
