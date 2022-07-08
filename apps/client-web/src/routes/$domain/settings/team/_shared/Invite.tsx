import { Button, ConfirmDialog, Input, Switch, toast, useBoolean, useId } from '@mashcard/design-system'
import { ChangeEventHandler, FC, useState } from 'react'

import { CreateOrUpdatePodInput, Group, PodOperation, useCreateOrUpdatePodMutation } from '@/MashcardGraphQL'
import { Panel } from '../../_shared/Panel'
import { SettingsContextProps } from '../../_shared/SettingContext'
import { useSettingsI18n } from '../../_shared/useSettingsI18n'
import * as Root from './Invite.style'

export const Invite: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n(['docs'])
  const [updatePod, { loading }] = useCreateOrUpdatePodMutation()
  const [open, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [inviteEnabled, { set: setEnable }] = useBoolean((pod! as Group).inviteEnable ?? false)
  const [inviteSecret, setInviteSecret] = useState((pod! as Group).inviteSecret)
  const switchLabelId = useId()
  const inviteUrl = `${window.location.protocol}//${window.location.host}/${pod!.domain}/join/${inviteSecret}`

  const updatePodHandler = async (
    values: Omit<CreateOrUpdatePodInput, 'domain' | 'type'>,
    onSuccess: () => void
  ): Promise<void> => {
    const result = await updatePod({
      variables: {
        input: {
          type: PodOperation.Update,
          domain: pod!.domain,
          ...values
        }
      }
    })

    const errors = result.data?.createOrUpdatePod?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      setInviteSecret((result.data?.createOrUpdatePod?.pod as Group | undefined)?.inviteSecret)
      onSuccess()
    }
  }

  const updateInviteEnable: ChangeEventHandler<HTMLInputElement> = async () => {
    const toggle = !inviteEnabled
    setEnable(toggle)
    await updatePodHandler(
      {
        inviteEnable: toggle
      },
      () => toast.success(t('team.invite_enable_updated'))
    )
  }

  const resetInviteSecret = async (): Promise<void> => {
    await updatePodHandler(
      {
        // Setting the invite secret to empty string will trigger the reset
        inviteSecret: ''
      },
      () => {
        toast.success(t('team.invite_enable_updated'))
        setClose()
      }
    )
  }

  return (
    <>
      <Panel title={t('team.invite')}>
        <Root.Warp>
          <Root.Label>
            <label id={switchLabelId}>{t('team.invite_label')}</label>
            <div className="desc">{t('team.invite_desc')}</div>
          </Root.Label>
          <Switch
            checked={inviteEnabled}
            aria-describedby={switchLabelId}
            size="lg"
            onChange={updateInviteEnable}
            loading={loading}
          />
        </Root.Warp>
        {inviteEnabled && (
          <Root.InviteLink>
            <Input value={inviteUrl} readOnly />
            <Button type="secondary" onClick={setOpen}>
              {t(`team.invite_secret_reset`)}
            </Button>
          </Root.InviteLink>
        )}
      </Panel>
      <ConfirmDialog
        open={open}
        onCancel={setClose}
        confirmBtnProps={{
          type: 'danger',
          loading
        }}
        onConfirm={resetInviteSecret}
      >
        {t('team.invite_secret_reset_confirm')}
      </ConfirmDialog>
    </>
  )
}
