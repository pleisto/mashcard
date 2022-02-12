import { FC, ChangeEventHandler, useState } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Box, Switch, useId, theme, toast, useBoolean, Input, Button, ConfirmDialog } from '@brickdoc/design-system'
import { PodOperation, useCreateOrUpdatePodMutation, CreateOrUpdatePodInput } from '@/BrickdocGraphQL'

export const Invite: FC<{ pod: SettingsContextProps['pod'] }> = ({ pod }) => {
  const { t } = useSettingsI18n(['docs'])
  const [updateSpace, { loading }] = useCreateOrUpdatePodMutation()
  const [open, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [inviteEnabled, { set: setEnable }] = useBoolean(pod!.inviteEnable)
  const [inviteSecret, setInviteSecret] = useState(pod!.inviteSecret)
  const switchLabelId = useId()
  const inviteUrl = `${window.location.protocol}//${window.location.host}/${pod!.webid}/join/${inviteSecret}`

  const updateSpaceHandler = async (values: Omit<CreateOrUpdatePodInput, 'webid' | 'type'>, onSuccess: () => void) => {
    const result = await updateSpace({
      variables: {
        input: {
          type: PodOperation.Update,
          webid: pod!.webid,
          ...values
        }
      }
    })

    const errors = result.data?.createOrUpdatePod?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      setInviteSecret(result.data?.createOrUpdatePod?.pod?.inviteSecret)
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
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            'div.desc': {
              color: theme.colors.typeSecondary,
              fontSize: theme.fontSizes.callout
            }
          }}
        >
          <div>
            <label id={switchLabelId}>{t('team.invite_label')}</label>
            <div className="desc">{t('team.invite_desc')}</div>
          </div>
          <Switch
            checked={inviteEnabled}
            aria-describedby={switchLabelId}
            size="lg"
            onChange={updateInviteEnable}
            loading={loading}
          />
        </Box>
        {inviteEnabled && (
          <Box
            css={{
              display: 'flex',
              width: '100%',
              '&>button': {
                marginLeft: '.5rem'
              }
            }}
          >
            <Input value={inviteUrl} readOnly />
            <Button type="secondary" onClick={setOpen}>
              {t(`team.invite_secret_reset`)}
            </Button>
          </Box>
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
