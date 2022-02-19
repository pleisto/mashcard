import { FC, useState } from 'react'
import { SettingsContextProps } from '@/settings/SettingContext'
import { Input, Button, Box, Modal, theme, useBoolean, FormControl, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { useSpaceDestroyMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'

const DangerText: FC = ({ children }) => (
  <Box css={{ color: theme.colors.red7 }} as="span">
    {children}
  </Box>
)

export const DeleteSpace: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const { t } = useSettingsI18n()
  const [deleteSpace, { loading: deleting }] = useSpaceDestroyMutation()
  const [inputVal, setInputVal] = useState('')
  const title = <DangerText>{t('team.delete_space')}</DangerText>
  const spaceUsername = space!.domain

  const deleteSpaceHandler = async () => {
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
      <Panel title={title}>
        <p>{t('team.delete_space_desc')}</p>
        <Button size="lg" onClick={setOpen}>
          <DangerText>{t('team.delete_space_btn')}</DangerText>
        </Button>
      </Panel>
      <Modal open={isOpen} onClose={setClose} title={t('team.delete_space_modal_title')}>
        <Trans
          t={t}
          i18nKey="team.delete_space_modal_desc"
          values={{
            domain: spaceUsername
          }}
        />

        <FormControl
          label={
            <Trans
              t={t}
              i18nKey="team.delete_space_confirm"
              values={{
                domain: spaceUsername
              }}
            />
          }
        >
          <Input type="text" onChange={e => setInputVal(e.target.value)} />
        </FormControl>
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
      </Modal>
    </>
  )
}
