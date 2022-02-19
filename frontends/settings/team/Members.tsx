import { FC, useContext, useState } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { Button, Box, ConfirmDialog, theme, useBoolean, toast } from '@brickdoc/design-system'
import { useSettingsI18n } from '@/settings/common/hooks'
import { SettingsContextProps } from '@/settings/SettingContext'
import { SpaceCard } from '@/common/components/SpaceCard'
import { Panel } from '@/settings/common/components/Panel'
import { useGetSpaceMembersQuery, GetSpaceMembersQuery, useSpaceLeaveMutation } from '@/BrickdocGraphQL'
import { Trans } from 'react-i18next'

export const Members: FC<{ space: SettingsContextProps['space'] }> = ({ space }) => {
  const [isOpen, { setTrue: setOpen, setFalse: setClose }] = useBoolean(false)
  const [selectedUser, setSelectedUser] = useState<NonNullable<GetSpaceMembersQuery['spaceMembers']>[0]>()
  const [spaceLeave, { loading: leaveing }] = useSpaceLeaveMutation()
  const { t } = useSettingsI18n()
  const context = useContext(BrickdocContext)
  const currentUserDomain = context.currentUser!.domain
  const { loading, data, refetch } = useGetSpaceMembersQuery()
  if (loading) return <></>
  const members = data?.spaceMembers

  const handleLeave = async (userDomain: string) => {
    const result = await spaceLeave({
      variables: {
        input: {
          domain: space!.domain,
          userDomain
        }
      }
    })
    const errors = result.data?.spaceLeave?.errors
    if (errors && errors.length > 0) {
      toast.error(errors.join('\n'))
    } else {
      toast.success(t('team.user_leave_success', { user: `@${userDomain}` }))
      await refetch()
      setClose()
    }
  }

  return (
    <>
      <Panel title={t('team.members')}>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
            width: '100%',
            border: `1px solid ${theme.colors.grey5}`,
            borderRadius: '6px',
            padding: 0,
            li: {
              padding: '1rem',
              borderBottom: `1px solid ${theme.colors.grey5}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:last-child': {
                borderBottom: 'none'
              }
            }
          }}
          as="ul"
        >
          {members?.map(user => (
            <li key={user.domain}>
              <SpaceCard space={user} key={user.domain} label={user.email || user.domain} />
              <Button
                disabled={user.domain === currentUserDomain}
                onClick={() => {
                  setSelectedUser(user)
                  setOpen()
                }}
              >
                {t('account.leave_btn')}
              </Button>
            </li>
          ))}
        </Box>
      </Panel>
      <ConfirmDialog
        confirmBtnProps={{
          type: 'danger',
          loading: leaveing
        }}
        open={isOpen}
        onCancel={setClose}
        onConfirm={async () => {
          await handleLeave(selectedUser!.domain)
        }}
      >
        <Trans
          t={t}
          i18nKey="team.leave_user_confirm"
          values={{
            user: `${selectedUser?.name} (@${selectedUser?.domain})`
          }}
        />
      </ConfirmDialog>
    </>
  )
}
