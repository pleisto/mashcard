import { FC, useState } from 'react'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Input, Button, Modal, useBoolean, FormControl, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { useSpaceDestroyMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'
import * as Root from './styles/DeleteSpace.style'

export const DeleteSpace: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const { t } = useSettingsI18n()
  const [deleteSpace, { loading: deleting }] = useSpaceDestroyMutation()
  const [inputVal, setInputVal] = useState('')

  const spaceUsername = space!.domain

  const deleteSpaceHandler = async (): Promise<void> => {
    const result = await deleteSpace({
      variables: {
        input: {
          domain: spaceUsername
        }
      }
    })
    const errors = result.data?.spaceDestroy?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.href = `/`
    }
  }

  return (
    <>
      <Panel title={t('team.delete_space')}>
        <Root.Warp>
          <Root.Desc>{t('team.delete_space_desc')}</Root.Desc>
          <Button size="lg" type="danger" onClick={setOpen}>
            {t('team.delete_space_btn')}
          </Button>
        </Root.Warp>
      </Panel>
      <Modal open={isOpen} onClose={setClose} title={t('team.delete_space_modal_title')}>
        <Root.ModalDesc>
          <Trans
            t={t}
            i18nKey="team.delete_space_modal_desc"
            values={{
              domain: spaceUsername
            }}
          />
        </Root.ModalDesc>

        <FormControl
          label={
            <Root.ModalDesc>
              <Trans
                t={t}
                i18nKey="team.delete_space_confirm"
                values={{
                  domain: spaceUsername
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
            onClick={deleteSpaceHandler}
            loading={deleting}
            block
            size="lg"
            disabled={inputVal !== spaceUsername}
          >
            {t('team.delete_space_confirm_btn')}
          </Button>
        </Root.ModalBtnGroup>
      </Modal>
    </>
  )
}
