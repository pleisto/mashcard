import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Input, Button, Box, Modal, theme, useBoolean, FormControl, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { useGetPodsQuery, useUserDestroyMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'

const DangerText: FC = ({ children }) => (
  <Box css={{ color: theme.colors.red7 }} as="span">
    {children}
  </Box>
)

export const DeleteAccount: FC = () => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const { t } = useSettingsI18n()
  const [deleteAccount, { loading: deleting }] = useUserDestroyMutation()
  const context = useContext(BrickdocContext)
  const [inputVal, setInputVal] = useState('')
  const userWebid = context.currentUser!.webid
  const title = <DangerText>{t('account.delete_account')}</DangerText>
  const { loading, data } = useGetPodsQuery()
  if (loading) return <></>

  const teamPods = data?.pods.filter(p => !p.personal)
  const hasTeamPods = teamPods && teamPods.length > 0

  const deleteAccountHandler = async () => {
    const result = await deleteAccount({
      variables: {
        input: {}
      }
    })
    const errors = result.data?.userDestroy?.errors
    if (errors && errors?.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      globalThis.location.href = `/accounts/sign_in`
    }
  }

  return (
    <>
      <Panel title={title}>
        <p>
          {hasTeamPods ? (
            <Trans
              t={t}
              i18nKey="account.delete_account_unavailable"
              values={{
                spaces: teamPods!.map(p => p.name).join(', ')
              }}
            />
          ) : (
            t('account.delete_account_desc')
          )}
        </p>
        <Button size="lg" onClick={setOpen} disabled={hasTeamPods}>
          <DangerText>{t('account.delete_account_btn')}</DangerText>
        </Button>
      </Panel>
      <Modal open={isOpen} onClose={setClose} title={t('account.delete_account_modal_title')}>
        <Trans
          t={t}
          i18nKey="account.delete_account_modal_desc"
          values={{
            webid: userWebid
          }}
        />

        <FormControl
          label={
            <Trans
              t={t}
              i18nKey="account.delete_account_confirm"
              values={{
                webid: userWebid
              }}
            />
          }
        >
          <Input type="text" onChange={e => setInputVal(e.target.value)} />
        </FormControl>
        <Button
          type="danger"
          onClick={deleteAccountHandler}
          loading={deleting}
          block
          size="lg"
          disabled={inputVal !== userWebid}
        >
          {t('account.delete_account_confirm_btn')}
        </Button>
      </Modal>
    </>
  )
}
