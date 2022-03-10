import { FC, ChangeEventHandler, useState } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Switch, useId, toast, useBoolean, Input, Button, ConfirmDialog } from '@brickdoc/design-system'
import { SpaceOperation, useCreateOrUpdateSpaceMutation, CreateOrUpdateSpaceInput } from '@/BrickdocGraphQL'
import * as Root from './styles/Invite.style'

export const Invite: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const { t } = useSettingsI18n(['docs'])
  const [updateSpace, { loading }] = useCreateOrUpdateSpaceMutation()
  const [open, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [inviteEnabled, { set: setEnable }] = useBoolean(space!.inviteEnable)
  const [inviteSecret, setInviteSecret] = useState(space!.inviteSecret)
  const switchLabelId = useId()
  const inviteUrl = `${window.location.protocol}//${window.location.host}/${space!.domain}/join/${inviteSecret}`

  const updateSpaceHandler = async (
    values: Omit<CreateOrUpdateSpaceInput, 'domain' | 'type'>,
    onSuccess: () => void
  ) => {
    const result = await updateSpace({
      variables: {
        input: {
          type: SpaceOperation.Update,
          domain: space!.domain,
          ...values
        }
      }
    })

    const errors = result.data?.createOrUpdateSpace?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      setInviteSecret(result.data?.createOrUpdateSpace?.space?.inviteSecret)
      onSuccess()
    }
  }

  const updateInviteEnable: ChangeEventHandler<HTMLInputElement> = async () => {
    const toggle = !inviteEnabled
    setEnable(toggle)
    await updateSpaceHandler(
      {
        inviteEnable: toggle
      },
      () => toast.success(t('team.invite_enable_updated'))
    )
  }

  const resetInviteSecret = async () => {
    await updateSpaceHandler(
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
