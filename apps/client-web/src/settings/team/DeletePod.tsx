import { FC, useState } from 'react'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Input, Button, Modal, useBoolean, FormControl, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { usePodDestroyMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'
import * as Root from './styles/DeletePod.style'

export const DeletePod: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const { t } = useSettingsI18n()
  const [deletePod, { loading: deleting }] = usePodDestroyMutation()
  const [inputVal, setInputVal] = useState('')

  const podUsername = pod!.domain

  const deletePodHandler = async (): Promise<void> => {
    const result = await deletePod({
      variables: {
        input: {
          domain: podUsername
        }
      }
    })
    const errors = result.data?.podDestroy?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.href = `/`
    }
  }

  return (
    <>
      <Panel title={t('team.delete_pod')}>
        <Root.Warp>
          <Root.Desc>{t('team.delete_pod_desc')}</Root.Desc>
          <Button size="lg" type="danger" onClick={setOpen}>
            {t('team.delete_pod_btn')}
          </Button>
        </Root.Warp>
      </Panel>
      <Modal open={isOpen} onClose={setClose} title={t('team.delete_pod_modal_title')}>
        <Root.ModalDesc>
          <Trans
            t={t}
            i18nKey="team.delete_pod_modal_desc"
            values={{
              domain: podUsername
            }}
          />
        </Root.ModalDesc>

        <FormControl
          label={
            <Root.ModalDesc>
              <Trans
                t={t}
                i18nKey="team.delete_pod_confirm"
                values={{
                  domain: podUsername
                }}
              />
            </Root.ModalDesc>
          }
        >
          <Input type="text" onChange={e => setInputVal(e.target.value)} />
        </FormControl>
        <Root.ModalBtnGroup>
          <Button
            onClick={() => {
              setClose()
            }}
            type="secondary"
            block
            size="lg"
          >
            {t('account.delete_account_confirm_cancel')}
          </Button>
          <Button
            type="danger"
            onClick={deletePodHandler}
            loading={deleting}
            block
            size="lg"
            disabled={inputVal !== podUsername}
          >
            {t('team.delete_pod_confirm_btn')}
          </Button>
        </Root.ModalBtnGroup>
      </Modal>
    </>
  )
}
