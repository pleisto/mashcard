import { Button, FormControl, Input, Modal, toast, Tooltip, useBoolean } from '@mashcard/design-system'
import { FC, useContext, useState } from 'react'
import { Trans } from 'react-i18next'

import { MashcardContext } from '@/common/mashcardContext'
import { useGetPodsQuery, useUserDestroyMutation } from '@/MashcardGraphQL'
import { Panel } from '../../_shared/Panel'
import { useSettingsI18n } from '../../_shared/useSettingsI18n'
import * as Root from './DeleteAccount.style'

export const DeleteAccount: FC = () => {
  const { t } = useSettingsI18n()
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [deleteAccount, { loading: deleting }] = useUserDestroyMutation()
  const context = useContext(MashcardContext)
  const [inputVal, setInputVal] = useState('')
  const userDomain = context.currentUser!.domain
  const { loading, data } = useGetPodsQuery()
  if (loading) return <></>

  const teamPods = data?.pods.filter(p => !p.personal)
  const hasTeamPods = teamPods && teamPods.length > 0

  const deleteAccountHandler = async (): Promise<void> => {
    const result = await deleteAccount({
      variables: {
        input: {}
      }
    })
    const errors = result.data?.userDestroy?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.href = `/accounts/sign-in`
    }
  }

  return (
    <>
      <Panel title={t('account.delete_account')}>
        <Root.Warp>
          <Root.Desc>
            {hasTeamPods ? (
              <Trans
                t={t}
                i18nKey="account.delete_account_unavailable"
                values={{
                  pods: teamPods!.map(p => p.name).join(', ')
                }}
              />
            ) : (
              t('account.delete_account_desc')
            )}
          </Root.Desc>
          <Tooltip
            title={
              <Trans
                t={t}
                i18nKey="account.delete_account_tip"
                values={{
                  pods: teamPods!.map(p => p.name).join(', ')
                }}
              />
            }
          >
            <Button
              type="danger"
              disabled={hasTeamPods}
              onClick={() => {
                setOpen()
              }}
            >
              {t('account.delete_account_btn')}
            </Button>
          </Tooltip>
        </Root.Warp>
      </Panel>
      <Modal open={isOpen} onClose={setClose} title={t('account.delete_account_modal_title')}>
        <Root.ModalDesc>
          <Trans
            t={t}
            i18nKey="account.delete_account_modal_desc"
            values={{
              domain: userDomain
            }}
          />
        </Root.ModalDesc>

        <FormControl
          label={
            <Root.ModalDesc>
              <Trans
                t={t}
                i18nKey="account.delete_account_confirm"
                values={{
                  domain: userDomain
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
            onClick={deleteAccountHandler}
            loading={deleting}
            disabled={inputVal !== userDomain}
            block
            size="lg"
          >
            {t('account.delete_account_confirm_btn')}
          </Button>
        </Root.ModalBtnGroup>
      </Modal>
    </>
  )
}
