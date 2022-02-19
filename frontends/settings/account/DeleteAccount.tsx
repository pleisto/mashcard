import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Input, Button, Box, Modal, theme, useBoolean, FormControl, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Panel } from '@/settings/common/components/Panel'
import { useGetSpacesQuery, useUserDestroyMutation } from '@/BrickdocGraphQL'
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
  const userDomain = context.currentUser!.domain
  const title = <DangerText>{t('account.delete_account')}</DangerText>
  const { loading, data } = useGetSpacesQuery()
  if (loading) return <></>

  const teamSpaces = data?.spaces.filter(p => !p.personal)
  const hasTeamSpaces = teamSpaces && teamSpaces.length > 0

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
          {hasTeamSpaces ? (
            <Trans
              t={t}
              i18nKey="account.delete_account_unavailable"
              values={{
                spaces: teamSpaces!.map(p => p.name).join(', ')
              }}
            />
          ) : (
            t('account.delete_account_desc')
          )}
        </p>
        <Button size="lg" onClick={setOpen} disabled={hasTeamSpaces}>
          <DangerText>{t('account.delete_account_btn')}</DangerText>
        </Button>
      </Panel>
      <Modal open={isOpen} onClose={setClose} title={t('account.delete_account_modal_title')}>
        <Trans
          t={t}
          i18nKey="account.delete_account_modal_desc"
          values={{
            domain: userDomain
          }}
        />

        <FormControl
          label={
            <Trans
              t={t}
              i18nKey="account.delete_account_confirm"
              values={{
                domain: userDomain
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
          disabled={inputVal !== userDomain}
        >
          {t('account.delete_account_confirm_btn')}
        </Button>
      </Modal>
    </>
  )
}
